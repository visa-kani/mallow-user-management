import { useState, useEffect } from "react";
// ************************** Types ************************************
import {
  FormData,
  hoverState,
  modelStateType,
  selectedUserType,
} from "../../constant/usersType";
// ************************** Reusable Components ***********************
import { Input } from "../../component/form-elements/input";
import { UserCard } from "../../component/user-card";
// import { userDataConst } from "../../constant/userData";
import { Button } from "../../component/button";
import TableData from "../../component/table";
import Modal from "../../component/modal";
// ************************** Icons ************************************
import { FiSearch } from "react-icons/fi";
import { BiTable } from "react-icons/bi";
import { IoList } from "react-icons/io5";
import { ImSwitch } from "react-icons/im";
// ************************** Pages ************************************
import { UserForm } from "./user-form";
// ************************** Packages *********************************
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  CreateUser,
  DeleteUserData,
  GetUserData,
  UpdateUserData,
} from "../../redux/slice/userDetails";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import toast from "react-hot-toast";
import { Loader } from "../../component/loader";
import { useSelector } from "react-redux";
import Pagination from "../../component/pagination";
import { NoRecordsWrapper } from "../../component/component-styles";
import noRecords from "../../assets/images/norecordfound.png";
import { useDebouncedCallback } from "use-debounce";
import { removeUserData } from "../../utils/common";
import { useNavigate } from "react-router-dom";

export const UserManagement = () => {
  const [dataView, setDataView] = useState<string>("list");
  const [openModal, setOpenModal] = useState<modelStateType>({
    value: false,
    type: "",
  });
  const [hovered, setHovered] = useState<hoverState>({
    value: false,
    id: null,
  });
  const [selectedUser, setSelectedUser] = useState<selectedUserType>(
    {} as selectedUserType
  );
  const [search, setSearch] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(6);
  const userData = useSelector((store: any) => store.userDetails.userData);
  const [btnLoader, setBtnLoader] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);
    dispatch(GetUserData({ per_page: perPage, page: page })).then(
      (res: any) => {
        setLoader(false);
      }
    );
  }, [page, perPage, searchValue, dispatch]);

  // Debounce callback
  // const debounced = useDebouncedCallback(
  //   (value) => {
  //     setSearchValue(value);
  //   },
  //   1000
  // );

  const searchIcon = FiSearch({}) as JSX.Element;
  const tableIcon = BiTable({}) as JSX.Element;
  const listIcon = IoList({}) as JSX.Element;
  const logOutIcon = ImSwitch({}) as JSX.Element;

  const handleOpenModal = (item: selectedUserType | any, type: string) => {
    setOpenModal((prev) => ({ value: !prev.value, type: type }));
    setSelectedUser(item);
  };

  const handleHover = (id: number) => {
    setHovered((prev) => ({ value: !prev.value, id: id }));
  };

  const filterData =
    search !== ""
      ? userData?.data?.filter((item: selectedUserType) => {
          return (
            item?.first_name.toLowerCase().includes(search.toLowerCase()) ||
            item?.last_name.toLowerCase().includes(search.toLowerCase()) ||
            item?.email.toLowerCase().includes(search.toLowerCase())
          );
        })
      : userData?.data;

  const userTableData = filterData?.map((item: selectedUserType) => {
    return item;
  });

  const formik = useFormik({
    initialValues: {
      first_name: selectedUser?.first_name || "",
      last_name: selectedUser?.last_name || "",
      email: selectedUser?.email || "",
      avatar: selectedUser?.avatar || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required("First Name is required").trim(),
      last_name: Yup.string().required("Last Name is required").trim(),
      email: Yup.string()
        .email("Invalid email")
        .required("Email is required")
        .trim(),
      avatar: Yup.string()
        .required("Avatar is required")
        .trim()
        .url("Profile URL is invalid"),
    }),
    onSubmit: (values: FormData, { resetForm }) => {
      if (selectedUser && selectedUser.id) {
        // Update mode
        setBtnLoader(true);
        dispatch(UpdateUserData({ values, id: selectedUser.id })).then(
          (res: any) => {
            toast.success("User updated successfully");
            setBtnLoader(false);
            setLoader(true);
            dispatch(GetUserData({})).then((res: any) => {
              setLoader(false);
            });
            // Optional: toast or UI feedback
            handleOpenModal({}, "");
          }
        );
      } else {
        // Create mode
        setBtnLoader(true);
        dispatch(CreateUser(values)).then((res: any) => {
          toast.success("User created successfully");
          setBtnLoader(false);
          setLoader(true);
          dispatch(GetUserData({})).then((res: any) => {
            setLoader(false);
          });
          handleOpenModal({}, "");
          resetForm(); // Reset form after creation
        });
      }
    },
  });

  const handleDelete = () => {
    setBtnLoader(true);
    dispatch(DeleteUserData(selectedUser.id)).then((res: any) => {
      toast.success("User deleted successfully");
      setBtnLoader(false);
      setLoader(true);
      dispatch(GetUserData({})).then((res: any) => {
        setLoader(false);
      });
      handleOpenModal({}, "");
    });
  };

  return (
    <div className="bg-[#f2f2f2] sm:h-[100vh] h-auto">
      <div className="container sm:w-[90%] w-[95%] m-auto">
        <div className="text-lg font-semibold px-5 pt-8 fixed -top-5 right-6">
          <div
            onClick={() => {
              removeUserData();
              window.location.href = "/";
              navigate("/");
            }}
            className="flex items-center gap-2 cursor-pointer text-[#f44336]"
          >
            {logOutIcon} Logout
          </div>
        </div>
        <div className="text-2xl font-semibold px-5 pt-8">Users</div>
        <div className="sm:flex block justify-between items-center">
          <div className="border-solid border-[2px] border-[#448ef7] mx-5 mt-2 inline-block px-3 rounded-lg">
            <div className="flex items-center gap-2 cursor-pointer">
              <div
                onClick={() => {
                  setDataView("list");
                  setPage(1);
                }}
                className={` w-[60px] text-center
                  ${
                    dataView === "list"
                      ? "text-[#448ef7] font-medium "
                      : "font-medium text-gray-400"
                  }
                `}
              >
                <div className="flex items-center align-middle">
                  {" "}
                  {listIcon}
                  <span className="ml-2">List</span>
                </div>
              </div>
              <div
                onClick={() => {
                  setDataView("table");
                  setPage(1);
                }}
                className={`border-solid border-l-[2px] border-[#448ef7] py-1 pl-3  w-[80px] text-center ${
                  dataView === "table"
                    ? "text-[#448ef7] font-medium"
                    : "font-medium text-gray-400"
                }`}
              >
                <div className="flex items-center align-middle">
                  {" "}
                  {tableIcon}
                  <span className="ml-2">Table</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mx-5 items-center gap-2 sm:mt-0 mt-5 ">
            <Input
              type="search"
              placeholder="Search"
              inputSize="sm"
              leftIcon={searchIcon}
              value={search}
              onChange={(e) => {
                // debounced(e.target.value);
                setSearch(e.target.value);
              }}
            />
            <Button
              btnMode="primary"
              btnSize="sm"
              onClick={() => handleOpenModal({}, "add")}
              btnStyle={{ width: "120px" }}
            >
              Add User
            </Button>
          </div>
        </div>
        {loader ? (
          <div className="flex items-center justify-center h-[60vh]">
            <Loader />
          </div>
        ) : dataView === "list" ? (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 p-5">
            {filterData?.map((item: any) => {
              const firstName = item.first_name ? item.first_name : "";
              const lastName = item.last_name ? item.last_name : "";
              const userName = firstName + " " + lastName;
              return (
                <UserCard
                  name={
                    userName?.length > 20
                      ? userName.slice(0, 20) + "..."
                      : userName
                  }
                  image={item.avatar}
                  email={item.email}
                  userData={item}
                  handleHover={handleHover}
                  handleOpenModal={handleOpenModal}
                  hovered={hovered}
                />
              );
            })}
          </div>
        ) : (
          <div className="p-5">
            <TableData
              scopedSlots={{
                " ": (row: any) => {
                  return (
                    <div>
                      <img
                        src={row.row.avatar}
                        alt=""
                        className="w-20 h-20 p-3 rounded-full object-cover"
                      />
                    </div>
                  );
                },
                Email: (row: any) => (
                  <div>
                    {row.row.email
                      ? row.row.email.length > 20
                        ? row.row.email.slice(0, 20) + "..."
                        : row.row.email
                      : "-"}
                  </div>
                ),
                "First Name": (row: any) => (
                  <div>
                    {row.row.first_name
                      ? row.row.first_name.length > 20
                        ? row.row.first_name.slice(0, 20) + "..."
                        : row.row.first_name
                      : "-"}
                  </div>
                ),
                "Last Name": (row: any) => (
                  <div>
                    {row.row.last_name
                      ? row.row.last_name.length > 20
                        ? row.row.last_name.slice(0, 20) + "..."
                        : row.row.last_name
                      : "-"}
                  </div>
                ),
                Action: (row: any) => (
                  <div className="flex gap-2 w-[70%]">
                    <Button
                      btnMode="primary"
                      onClick={() => {
                        handleOpenModal(row.row, "edit");
                      }}
                      btnSize="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      btnMode="danger"
                      onClick={() => handleOpenModal(row.row, "delete")}
                      btnSize="sm"
                    >
                      Delete
                    </Button>
                  </div>
                ),
              }}
              columns={[" ", "Email", "First Name", "Last Name", "Action"]}
              data={userTableData}
              Clickable={true}
              rowClick={(row) => {
                console.log(row);
              }}
              loader={false}
            />
          </div>
        )}
        {loader ? null : userData?.data?.length === 0 ? (
          <>
            <NoRecordsWrapper>
              <div className="No_Records_Ctrl"></div>
              <div className="flex items-center justify-center mt-14">
                <img
                  src={noRecords}
                  alt="No Records"
                  width={300}
                  height={300}
                />
              </div>
            </NoRecordsWrapper>
            <Pagination
              currentPage={page}
              totalPages={10}
              onPageChange={(page) => setPage(page)}
            />
          </>
        ) : (
          <Pagination
            currentPage={page}
            totalPages={10}
            onPageChange={(page) => setPage(page)}
          />
        )}
      </div>
      <Modal
        isOpen={openModal.value}
        onClose={() => {
          setOpenModal({ value: false, type: "" });
          formik.resetForm();
        }}
        title={
          openModal.type === "edit"
            ? "Edit User"
            : openModal.type === "delete"
            ? "Delete User"
            : "Add User"
        }
        SubmitTxt={
          openModal.type === "delete"
            ? btnLoader
              ? "Deleting..."
              : "Delete"
            : openModal.type === "add"
            ? btnLoader
              ? "Submitting..."
              : "Submit"
            : btnLoader
            ? "Submitting..."
            : "Submit"
        }
        closeBtn={true}
        onSubmit={
          openModal.type === "delete" ? handleDelete : formik.handleSubmit
        }
        centerModal={openModal.type === "delete" ? true : false}
        loader={btnLoader}
      >
        <div>
          {openModal.type === "delete" ? (
            <div>
              <p className="text-center my-4">
                Are you sure you want to delete this user{" "}
                <span className="font-semibold capitalize">
                  {selectedUser?.first_name} {selectedUser?.last_name}
                </span>
                ?
              </p>
            </div>
          ) : (
            <UserForm formik={formik} />
          )}
        </div>
      </Modal>
    </div>
  );
};
