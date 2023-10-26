import FormInput from "@/components/FormInput";
import BigButton from "@/components/BigButton";
import "./login.css";

export default function LogInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-3 w-1/4 mx-auto bg-[rgba(65,65,65,0.77)] border border-[#6643b5] p-8 rounded-lg items-center justify-center h-fit">
        <h1 className="text-[36px] mb-5 text-[#6643b5] not-italic font-medium leading-6 font-Raleway">
          Log In
        </h1>
        <FormInput placeholder="Email" />
        <FormInput placeholder="Password" />
        <BigButton text="Log In" />
      </div>
    </div>
  );
}