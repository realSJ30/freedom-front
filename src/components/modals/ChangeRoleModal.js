import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { connect, useSelector } from "react-redux";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { updateUserRole } from "../../redux/actions/users.action";

import Spinner from "../Spinner";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ChangeRoleModal = (props) => {
  const roleState = useSelector((state) => state.rolesState);
  const [selected, setSelected] = useState(
    roleState.roles.filter((role) => role.id == props.selectedUser.role_id)[0]
  );
  const cancelButtonRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(props.selectedUser);
    props.updateUserRole(
      props.selectedUser.id,
      { role: selected.id },
      props.setOpen
    );
  };

  useEffect(() => {
    setSelected(
      roleState.roles.filter((role) => role.id == props.selectedUser.role_id)[0]
    );
  }, [props.selectedUser]);

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={props.setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative px-4 py-8 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <h1 className="font-bold text-gray-700">Change Role</h1>
              <br />
              <form onSubmit={handleSubmit}>
                <div className="col-span-6 sm:col-span-3">
                  {selected && (
                    <Listbox
                      value={selected}
                      onChange={(e) => {
                        setSelected(
                          roleState.roles.filter((role) => role.id == e)[0]
                        );
                      }}
                    >
                      {({ open }) => (
                        <>
                          <Listbox.Label className="block text-sm font-medium text-gray-700">
                            Assigned to
                          </Listbox.Label>
                          <div className="mt-1 relative">
                            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                              <span className="flex items-center">
                                <span className="ml-3 block truncate">
                                  {selected.title}
                                </span>
                              </span>
                              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {roleState.roles.map((role) => (
                                  <Listbox.Option
                                    key={role.id}
                                    className={({ active }) =>
                                      classNames(
                                        active
                                          ? "text-white bg-indigo-600"
                                          : "text-gray-900",
                                        "cursor-default select-none relative py-2 pl-3 pr-9"
                                      )
                                    }
                                    value={role.id}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <div className="flex items-center">
                                          <span
                                            className={classNames(
                                              selected
                                                ? "font-semibold"
                                                : "font-normal",
                                              "ml-3 block truncate"
                                            )}
                                          >
                                            {role.title}
                                          </span>
                                        </div>

                                        {selected ? (
                                          <span
                                            className={classNames(
                                              active
                                                ? "text-white"
                                                : "text-indigo-600",
                                              "absolute inset-y-0 right-0 flex items-center pr-4"
                                            )}
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>
                  )}

                  <br />
                  <div className="py-3 bg-gray-50 text-right flex">
                    <button
                      type="submit"
                      className="flex items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {/* {storeState.loading && <Spinner containersize="h-auto" />} */}
                      {/* {storeState.loading ? "Saving" : "Save"} */}
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserRole: (id, data, setOpen) =>
      dispatch(updateUserRole(id, data, setOpen)),
  };
};

export default connect(null, mapDispatchToProps)(ChangeRoleModal);
