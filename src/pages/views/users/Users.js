import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import ChangeRoleModal from "../../../components/modals/ChangeRoleModal";
import { getAllUsers } from "../../../redux/actions/users.action";
import { getAllRoles } from "../../../redux/actions/roles.action";

const Users = (props) => {
  const { users, loading, error } = useSelector((state) => state.usersState);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    props.getAllUsers();
    props.getAllRoles();
  }, []);

  return (
    <div className="flex flex-col">
      {selectedUser && (
        <ChangeRoleModal
          open={open}
          setOpen={setOpen}
          selectedUser={selectedUser}
        />
      )}
      <div className="rounded-lg shadow-md overflow-hidden">
        <table className="table-auto w-full ">
          <thead className="bg-gray-100 border-b-2 text-left">
            <tr>
              <th className="p-2">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>   
              {/* <th></th>       */}
            </tr>
          </thead>
          <tbody>
            {users.map((user, indx) => (
              <tr key={indx} className="border-b">
                <td className="p-2">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.is_active == 1 ? "Active" : "Inactive"}</td>
                {/* <td className="text-right p-2 flex space-x-1 justify-end">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setOpen(true);
                    }}
                    className="px-2 py-1 bg-indigo-400 rounded-md text-white"
                  >
                    Change Role
                  </button>
                  <button className="px-2 py-1 bg-red-400 rounded-md text-white">
                    Deactivate
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
    getAllRoles: () => dispatch(getAllRoles()),
  };
};

export default connect(null, mapDispatchToProps)(Users);
