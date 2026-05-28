import { Faculty } from "@/types/faculty";
import FacultyCard from "./FacultyCard";


interface FacultyGridProps {
  facultyList: Faculty[];
}

export default function FacultyGrid({ facultyList }: FacultyGridProps) {
  if (facultyList.length === 0) {
    return (
      <div data-component="FacultyGrid" className="text-center py-12 text-govt-muted">
        <p className="text-lg">No faculty members found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {facultyList.map((member) => (
        <FacultyCard key={member.id} faculty={member} />
      ))}
    </div>
  );
}
