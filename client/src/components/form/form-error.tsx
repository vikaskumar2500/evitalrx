import { IoIosCloseCircleOutline } from "react-icons/io";

interface FormErrorProps {
  error: any;
}
export const FormError = ({ error }: FormErrorProps) => {
  return (
    <>
      {error ? (
        <div className="flex flex-row gap-1 items-center text-red-600">
          <IoIosCloseCircleOutline color="red" size={14} />
          <span className="text-xs">{error.message}</span>
        </div>
      ) : null}
    </>
  );
};
