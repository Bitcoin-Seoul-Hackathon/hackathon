import LeftSideCards from "@/features/world/left-side";
import { PassportCard } from "@/features/world/passport";
import RightSideCards from "@/features/world/right-side";

export default function PassportPage() {
  return (
    <div className={"grid sm:grid-cols-4 gap-3"}>
      <PassportCard />
      <LeftSideCards />
      <RightSideCards />
    </div>
  );
}
