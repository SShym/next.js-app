import Spinner from "@/shared/components/ui/spinner";

export default function Loading() {
  return (
    <div className='absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center w-full h-full'>
      <Spinner height={50} width={50} />
    </div>
  );
}