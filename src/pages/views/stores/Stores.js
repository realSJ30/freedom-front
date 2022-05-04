import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateStoreModal from "../../../components/modals/CreateStoreModal";
import {
  getAllStores,
  removeStore,
  restoreStore,
} from "../../../redux/actions/store.action";
import { convertDate } from "../../../utils/globals";

const Stores = (props) => {
  const storeState = useSelector((state) => state.storeState);
  const [open, setOpen] = useState(false);
  const [table, setTable] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    props.getAllStores();
  }, []);

  return (
    <div className="">
      <CreateStoreModal open={open} setOpen={setOpen} />
      <div className="flex items-center justify-between">
        <button
          onClick={() => setOpen(true)}
          className="p-2 bg-indigo-600 rounded-md w-auto text-white"
        >
          Create store
        </button>
        <button
          onClick={() => setTable(table == 1 ? 0 : 1)}
          className={
            table == 1
              ? "p-2 bg-red-400 rounded-md w-auto text-white"
              : "p-2 bg-indigo-400 rounded-md w-auto text-white"
          }
        >
          {table == 1 ? "Archives" : "Back"}
        </button>
      </div>
      <div className="rounded-lg shadow-md overflow-hidden my-4">
        <table className="table-auto w-full ">
          <thead className="bg-gray-100 border-b-2 text-left">
            <tr>
              <th className="p-2">Store Name</th>
              <th>Location</th>
              <th>Map</th>
              <th>Status</th>
              <th>Created</th>
              <th>Owner</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {storeState.stores.map(
              (store, indx) =>
                store.is_active == table && (
                  <tr key={indx} className="border-b">
                    <td className="p-2">{store.name}</td>
                    <td>{store.location}</td>
                    <td>Map here</td>
                    <td>{store.is_active ? "Active" : "Inactive"}</td>
                    <td>{convertDate(store.created_at)}</td>
                    <td>{store.owner}</td>
                    <td className="flex items-center justify-end space-x-1 p-2">
                      {store.is_active == 1 && (
                        <button
                          onClick={() =>
                            navigate({ pathname: `/store/${store.id}` })
                          }
                          className="px-2 py-1 bg-indigo-400 rounded-md text-white"
                        >
                          View
                        </button>
                      )}
                      <button
                        onClick={() => {
                          store.is_active == 1
                            ? props.removeStore(store.id)
                            : props.restoreStore(store.id);
                        }}
                        className={
                          store.is_active == 1
                            ? "px-2 py-1 bg-red-400 rounded-md text-white"
                            : "px-2 py-1 bg-green-400 rounded-md text-white"
                        }
                      >
                        {store.is_active == 1 ? "Delete" : "Restore"}
                      </button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllStores: () => dispatch(getAllStores()),
    removeStore: (id) => dispatch(removeStore(id)),
    restoreStore: (id) => dispatch(restoreStore(id)),
  };
};

export default connect(null, mapDispatchToProps)(Stores);
