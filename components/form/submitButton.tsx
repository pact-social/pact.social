import { useFormContext } from "react-hook-form";

export default function SubmitButton ({
  name,
  className,
  type,
}: {
  name: string;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}) {
  const methods = useFormContext()
  const {
    formState: { isValid, isLoading, isSubmitting, isSubmitted, isSubmitSuccessful, errors },
  } = methods

  return (
    <button 
      type={type || "submit"}
      className={`btn ${className} ${(isLoading || isSubmitting || !isValid) && 'btn-disabled'} ${isSubmitSuccessful ? 'btn-success' : ''}`}>
      {(isLoading || isSubmitting) && <span className="loading loading-spinner"></span>}
      {isSubmitSuccessful ? <>success</> : (!isValid) ? <>complete to {name}</>: <>{name}</> }
    </button>
  )
}
