import Spinner from "@/shared/components/ui/spinner";

export default function Loading() {
  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      <Spinner height={50} width={50} />
    </div>
  );
}
