const fs = require('fs');
const path = require('path');

const modules = [
  { name: 'courses', model: 'course', form: 'CourseForm', prop: 'course' },
  { name: 'events', model: 'event', form: 'EventForm', prop: 'event' },
  { name: 'faculty', model: 'faculty', form: 'FacultyForm', prop: 'faculty' },
  { name: 'gallery', model: 'galleryImage', form: 'GalleryUploadForm', prop: null },
  { name: 'notices', model: 'notice', form: 'NoticeForm', prop: 'notice' },
  { name: 'publications', model: 'publication', form: 'PublicationForm', prop: 'publication' },
  { name: 'downloads', model: 'download', form: 'DownloadForm', prop: 'download' },
  { name: 'users', model: 'user', form: 'UserForm', prop: 'user' },
];

for (const mod of modules) {
  const pagePath = path.join('src/app/admin', mod.name, 'page.tsx');
  if (!fs.existsSync(pagePath)) continue;
  
  let code = fs.readFileSync(pagePath, 'utf8');
  let init = code;

  // Add imports if missing
  if (!code.includes('AdminModal')) {
    code = `import AdminModal from "@/components/admin/AdminModal";\n` + code;
  }
  if (!code.includes(mod.form)) {
    code = `import ${mod.form} from "@/components/admin/forms/${mod.form}";\n` + code;
  }

  // Find function declaration
  const funcMatch = code.match(/export default async function (\w+)\(\)\s*\{/);
  if (funcMatch) {
    const funcName = funcMatch[1];
    
    // Create the search params logic
    let paramLogic = `
  type PageProps = { searchParams: Promise<{ [key: string]: string | undefined }> };
  export default async function ${funcName}(props: PageProps) {
    const searchParams = await props.searchParams;
    const isNew = searchParams.new === 'true';
    const editId = searchParams.edit;
    let editItem = null;
    if (editId) {
      editItem = await prisma.${mod.model}.findUnique({ where: { id: editId } });
    }
`;

    // special case for gallery
    if (mod.name === 'gallery') {
      paramLogic = `
  type PageProps = { searchParams: Promise<{ [key: string]: string | undefined }> };
  export default async function ${funcName}(props: PageProps) {
    const searchParams = await props.searchParams;
    const isNew = searchParams.new === 'true';
`;
    }

    code = code.replace(funcMatch[0], paramLogic.trim());
  }

  // Replace links
  const editRegex = new RegExp(`href={\`/admin/${mod.name}/\\\$\\{([^}]+)\\}/edit\`}`, 'g');
  code = code.replace(editRegex, 'href={`?edit=${$1}`}');
  
  const newRegex = new RegExp(`href="/admin/${mod.name}/new"`, 'g');
  code = code.replace(newRegex, 'href="?new=true"');

  // Add modal to the end before the final </div>
  let modalJsx = '';
  if (mod.name === 'gallery') {
    modalJsx = `
      {isNew && (
        <AdminModal returnTo="/admin/${mod.name}">
          <${mod.form} />
        </AdminModal>
      )}`;
  } else {
    modalJsx = `
      {isNew && (
        <AdminModal returnTo="/admin/${mod.name}">
          <${mod.form} />
        </AdminModal>
      )}
      {editItem && (
        <AdminModal returnTo="/admin/${mod.name}">
          <${mod.form} ${mod.prop}={editItem} />
        </AdminModal>
      )}`;
  }

  code = code.replace(/(<\/div>\s*\);\s*}\s*)$/, `${modalJsx}\n    $1`);

  if (code !== init) {
    fs.writeFileSync(pagePath, code);
    console.log('Processed:', pagePath);
  }
}
