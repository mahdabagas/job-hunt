import { Loader2Icon } from "lucide-react";
import { FC } from "react";

interface LoadingProps {
    
}
 
const Loading: FC<LoadingProps> = () => {
    return (
        <div className='px-32 py-16 flex justify-center items-center'>
            <Loader2Icon className='animate-spin text-primary block w-12 h-12'/>
        </div>
    );
}
 
export default Loading;