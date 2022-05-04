import React, { useEffect, useState } from "react";
import {
  PaperClipIcon,
  PencilAltIcon,
  PencilIcon,
  XIcon,
} from "@heroicons/react/solid";
import {
  getSelectedStore,
  removeSelectedStore,
  updateStore,
} from "../../../redux/actions/store.action";
import { useParams, useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import Spinner from "../../../components/Spinner";
import { convertDate } from "../../../utils/globals";
const StoreDetail = (props) => {
  let navigate = useNavigate();
  const { id } = useParams();
  const storeDetail = useSelector((state) => state.storeDetailState);
  const [edit, setEdit] = useState(false);
  const [store, setStore] = useState({});

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    props.getSelectedStore(id, setStore, goBack);
    return () => {
      props.removeSelectedStore();
    };
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.updateStore(id, store);
    setEdit(false);
  };

  return (
    <>
      {Object.keys(storeDetail).length === 0 ? (
        <Spinner />
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
            <div className="flex flex-col">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Store Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {convertDate(store.created_at)}
              </p>
            </div>
            {!edit ? (
              <PencilAltIcon
                className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-800"
                onClick={() => setEdit(true)}
              />
            ) : (
              <XIcon
                className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-800"
                onClick={() => {
                  setStore(storeDetail);
                  setEdit(false);
                }}
              />
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Store name
                  </dt>
                  {edit ? (
                    <input
                      onChange={(e) =>
                        setStore((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      value={store.name}
                      type="text"
                      name="store-name"
                      id="store-name"
                      autoComplete="store-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  ) : (
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {store.name}
                    </dd>
                  )}
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Location
                  </dt>
                  {edit ? (
                    <input
                      onChange={(e) =>
                        setStore((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                      value={store.location}
                      type="text"
                      name="store-name"
                      id="store-name"
                      autoComplete="store-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  ) : (
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {store.location}
                    </dd>
                  )}
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Map</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Map here
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Owner</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {store.owner}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                  {edit && (
                    <button className="px-2 py-1 bg-indigo-400 rounded-md text-white">
                      Save
                    </button>
                  )}
                </div>
              </dl>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSelectedStore: (id, setStore, goBack) =>
      dispatch(getSelectedStore(id, setStore, goBack)),
    removeSelectedStore: () => dispatch(removeSelectedStore()),
    updateStore: (id, data) => dispatch(updateStore(id, data)),
  };
};

export default connect(null, mapDispatchToProps)(StoreDetail);
