import { Badge } from "@/components/ui/badge";
import { JobType, categoryJobType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface JobItemProps extends JobType {}
 
const JobItem: FC<JobItemProps> = ({categories, desc, image, jobType, location, name, type, skills, id}) => {
    const router = useRouter();

    return ( 
        <div className="border border-border p-6 cursor-pointer" onClick={() => router.push(`/detail/job/${id}`)}>
            <div className="flex flex-row justify-between items-start">
                <Image src={image} alt={image} width={48} height={48} /> 
                <span className="px-4 py-1 text-xs border font-semibold text-primary border-primary">
                    {jobType}
                </span>
            </div>
            <div className="my-4">
                <div className="font-semibold text-lg">{name}</div>
                <div className="text-muted-foreground mb-3">
                    {type} . {location}
                </div>
                <div className="text-muted-foreground h-12 line-clamp-2 text-ellipsis" dangerouslySetInnerHTML={{ __html: desc}}/>
            </div>
            <div className="space-x-2">
                {skills.map((item: string, i: number) => (
                    <Badge 
                        key={item + i}
                        variant="outline"
                        className="rounded border-primary bg-primary/5 text-primary">
                        {item}
                    </Badge>
                ))}
            </div>
        </div>
     );
}
 
export default JobItem;