import AppSettings from "./app-setting/app-setting.component";
import PersonalSettings from "./personal-setting/personal-setting.component";

const Settings = () => {
  return (
    <div className="flex gap-5 flex-col col-start-2 col-end-[-1]">
      <PersonalSettings />
      <AppSettings />
    </div>
  );
};
export default Settings;
