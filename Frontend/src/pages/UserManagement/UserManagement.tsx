import { useEffect, useState } from "react";
import "./UserManagement.css";
import { getAllUsers, setUserActiveStatus } from "../../services/adminService";
import type { FullUserDetails } from "../../types/Types";
import { useToast } from "../../context/ToastContext";

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<FullUserDetails[]>([]);
    const { showToast } = useToast();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await getAllUsers();
        setUsers(response);
    };

    const handleToggleActive = async (user: FullUserDetails) => {
        try {
            await setUserActiveStatus(user.userId, !user.isActive);
            showToast(
                `${user.firstName} ${user.lastName} has been ${user.isActive ? "deactivated" : "activated"}.`,
                "success"
            );
            fetchUsers(); // refresh list
        } catch {
            showToast("Failed to update user status.", "error");
        }
    };

    return (
        <div className="user-management">
            <h2>User Management</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.userId} className={!user.isActive ? "user-row-inactive" : ""}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>
                                <span className={`role-badge ${user.isAdmin ? "role-admin" : "role-user"}`}>
                                    {user.isAdmin ? "Admin" : "User"}
                                </span>
                            </td>
                            <td>
                                <span className={`status-badge ${user.isActive ? "status-active" : "status-inactive"}`}>
                                    {user.isActive ? "Active" : "Inactive"}
                                </span>
                            </td>
                            <td>
                                <button
                                    className={`btn-toggle ${user.isActive ? "btn-deactivate" : "btn-activate"}`}
                                    onClick={() => handleToggleActive(user)}
                                >
                                    {user.isActive ? "Deactivate" : "Activate"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;