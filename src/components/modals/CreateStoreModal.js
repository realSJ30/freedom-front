import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { createStore } from "../../redux/actions/store.action";
import { connect, useSelector } from "react-redux";
import Spinner from "../Spinner";

const CreateStoreModal = (props) => {
  const cancelButtonRef = useRef(null);

  const storeState = useSelector((state) => state.storeState);

  const [store, setStore] = useState({
    name: "",
    location: "",
    lat: "5",
    long: "5",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.createStore(store, props.setOpen);
    console.log(store);
  };

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
            <div className="relative p-4 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <h1 className="font-bold text-gray-700">Create store</h1>
              <br />
              <form onSubmit={handleSubmit}>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="store-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Store name
                  </label>
                  <input
                    onChange={(e) =>
                      setStore((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    type="text"
                    name="store-name"
                    id="store-name"
                    autoComplete="store-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    onChange={(e) =>
                      setStore((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    type="text"
                    name="location"
                    id="location"
                    autoComplete="location"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                  <br />
                  <div className="py-3 bg-gray-50 text-right flex">
                    <button
                      type="submit"
                      className="flex items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {storeState.loading && <Spinner containersize="h-auto" />}
                      {storeState.loading ? "Saving" : "Save"}
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
    createStore: (data, setOpen) => dispatch(createStore(data, setOpen)),
  };
};

export default connect(null, mapDispatchToProps)(CreateStoreModal);
