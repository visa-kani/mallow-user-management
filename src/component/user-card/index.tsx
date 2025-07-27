import { UserManagementWrapper } from "../component-styles";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

type userCardProps = {
  name?: string;
  image?: string;
  email?: string;
  userData?: {
    id: any;
    userName: string;
    email: string;
    image: any;
  };
  handleHover: (id: any) => void;
  handleOpenModal: (item: any, type: string) => void;
  hovered: {
    value: boolean;
    id: null | number | undefined;
  };
};

export const UserCard = (props: userCardProps) => {
  const { name, image, email, userData, handleHover, hovered, handleOpenModal } = props;
  const editIcon = MdOutlineModeEdit({}) as JSX.Element;
  const deleteIcon = MdDelete({}) as JSX.Element;
  return (
    <UserManagementWrapper
      onMouseLeave={() => handleHover(userData?.id)}
      onMouseEnter={() => handleHover(userData?.id)}
    >
      <div className="user-details-card">
        <div className="flex items-center justify-center">
          <img
            src={image}
            alt=""
            className="w-32 h-32 rounded-full image-hover"
          />
        </div>
        <div className="text-center pb-2 pt-3 font-semibold">{name}</div>
        <div className="text-center font-medium text-[#757575]">{email}</div>
        {hovered.value && hovered.id === userData?.id ? (
          <div className="action-elements">
            <div className="flex gap-4">
              <div onClick={() => handleOpenModal(userData, "edit")} className="bg-[#448ef7] text-white p-2 text-xl rounded-full">
                {editIcon}
              </div>
              <div onClick={() => handleOpenModal(userData, "delete")} className="bg-[#f44336] text-white p-2 text-xl rounded-full">
                {deleteIcon}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </UserManagementWrapper>
  );
};
