import { Skeleton } from "primereact/skeleton";

export default function DatatableSkeleton() {
  return (
    <>
      <div className="flex justify-content-between border-top-1 border-bottom-1 border-300 ">
        <div>
          <Skeleton width="10rem" height="3rem" className="mt-3"></Skeleton>
        </div>
        <div className="grid mb-4">
          <Skeleton width="15rem" height="3rem" className="mt-3"></Skeleton>
          <Skeleton width="10rem" height="3rem" className="mt-3 ml-3"></Skeleton>
        </div>
      </div>
      <Skeleton width="100%" height="3rem" className="mt-3"></Skeleton>
      <Skeleton width="100%" height="4rem" className="mt-3"></Skeleton>
      <Skeleton width="100%" height="4rem" className="mt-3"></Skeleton>
      <Skeleton width="100%" height="4rem" className="mt-3"></Skeleton>
      <Skeleton width="100%" height="4rem" className="mt-3"></Skeleton>
    </>
  );
}
