import FormInput from "@/components/FormInput";
import BigButton from "@/components/BigButton";

export default function ProfilePage() {
  return (
    <>
      <div className="my-8 mx-auto max-w-2xl">
        <div className="bg-[rgba(65,65,65,0.77)] border border-[#6643b5] p-8 rounded-lg">
          <h1 className="text-[36px] mb-5 text-[#6643b5] not-italic font-medium leading-6 font-Raleway">
            User Information
          </h1>
          <div className="mb-4">
            <label className="flex flex-col">
              <span className="mb-2">Name</span>
              <p>John Doe</p>
            </label>
          </div>
          <div className="mb-4">
            <label className="flex flex-col">
              <span className="mb-2">Email</span>
              <p>john.doe@example.com</p>
            </label>
          </div>
        </div>
      </div>
      <div className="flex gap-8 mx-auto mt-8 max-w-2xl">
        <div className="flex-1">
          <div className="bg-[rgba(65,65,65,0.77)] border border-[#6643b5] p-8 rounded-lg">
            <h1 className="text-[36px] mb-5 text-[#6643b5] not-italic font-medium leading-6 font-Raleway">
              Change Email
            </h1>
            <div className="mb-4">
              <FormInput placeholder="Current Email" />
            </div>
            <div className="mb-4">
              <FormInput placeholder="New Email" />
            </div>
            <BigButton text="Change Email" />
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-[rgba(65,65,65,0.77)] border border-[#6643b5] p-8 rounded-lg">
            <h1 className="text-[36px] mb-5 text-[#6643b5] not-italic font-medium leading-6 font-Raleway">
              Change Pass
            </h1>
            <div className="mb-4">
              <FormInput placeholder="Current Email" />
            </div>
            <div className="mb-4">
              <FormInput placeholder="New Password" />
            </div>
            <BigButton text="Change Password" />
          </div>
        </div>
      </div>
      <div className="my-8 mx-auto max-w-2xl">
        <div className="bg-[rgba(65,65,65,0.77)] border border-[#6643b5] p-8 rounded-lg">
          <h1 className="text-[36px] mb-5 text-[#6643b5] not-italic font-medium leading-6 font-Raleway">
            Notifications
          </h1>
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Recevoir des notifications toutes les 24h
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Recevoir des notifications toutes les 48h
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Ne pas recevoir de notifications
            </label>
          </div>
          <BigButton text="Valider" />
        </div>
      </div>
    </>
  );
}
