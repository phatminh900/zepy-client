import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DayPicker } from "react-day-picker";
import Button from "src/components/button";
import InputRadio from "src/components/input-radio";
import RowLayout from "../row-layout.component";
import { useGetUser } from "src/hooks/useAuth";
import { useUpdateUserInfo } from "src/features/user/user-feature.hook";

const PersonalSettings = () => {
  const { t } = useTranslation("settings");
  const { user, refetch } = useGetUser();
  const { isLoading: isUpdatingName, updateInfo: updateName } =
    useUpdateUserInfo("fullname");
  const { isLoading: isUpdatingGender, updateInfo: updateGender } =
    useUpdateUserInfo("gender");

  const [fullName, setFullName] = useState(user!.fullname);
  const [gender, setGender] = useState(user!.gender);

  const [isOpenDayPicker, setIsOpenDayPicker] = useState(false);
  const open = () => setIsOpenDayPicker(true);
  const close = () => setIsOpenDayPicker(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // equal the same old result
    if (fullName === user!.fullname && gender === user!.gender) return;
    if (fullName !== user!.fullname) {
      updateName(
        { userId: user!.id, value: fullName },
        { onSuccess: () => refetch() }
      );
    }
    if (gender !== user!.gender) {
      updateGender(
        { userId: user!.id, value: gender },
        { onSuccess: () => refetch() }
      );
    }
  };

  return (
    <div>
      <h3 className="font-semibold py-3 px-2.5 border-b border-b-[var(--color-grey-500)]">
        {t("profile")}
      </h3>
      <div>
        <RowLayout className="p-3 flex" title="Email">
          <div className="py-2.5 px-2 bg-[var(--color-grey-300)] inline-block cursor-not-allowed">
            phatminh123@gmail.com
          </div>
        </RowLayout>
        <form onSubmit={handleSubmit} className=" p-3">
          <RowLayout className="flex items-center" title={t("yourName")}>
            <div className="py-2.5 px-2 bg-[var(--color-grey-200)] ">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </RowLayout>
          {/* Gender */}
          <RowLayout title={t("gender")}>
            <div className="flex gap-5">
              <InputRadio
                name="gender"
                id="male"
                onChange={(e) => setGender("male")}
                checked={gender === "male"}
                label={t("male")}
              />
              <InputRadio
                onChange={(e) => setGender("female")}
                name="gender "
                checked={gender === "female"}
                id="female"
                label={t("female")}
              />
            </div>
          </RowLayout>
          <RowLayout title="BirthDay">
            <p>BirthDay</p>
          </RowLayout>
          <Button variation="primary" className=" p-3">
            {isUpdatingGender || isUpdatingName ? t("updating") : t("update")}
          </Button>
        </form>
      </div>
    </div>
  );
};
export default PersonalSettings;
