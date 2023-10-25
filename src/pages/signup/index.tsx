import FormInput from "@/components/FormInput";
import BigButton from "@/components/BigButton";

export default function SignUpPage() {
  return (
    <>
      <div className="flex flex-col gap-3 w-1/4 mx-auto mt-[300px] bg-[rgba(65,65,65,0.77)] border border-[#6643b5] p-8 rounded-lg">
        <h1 className="text-[36px] mb-5 text-[#6643b5] not-italic font-medium leading-6 font-Raleway">
          SignUp
        </h1>
        <FormInput placeholder="Email" />
        <FormInput placeholder="Password" />
        <BigButton text="SignUp" />
      </div>
    </>
  );
}
