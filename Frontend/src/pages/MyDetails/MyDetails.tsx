import "./MyDetails.css";
import { useState, useEffect } from "react";
import { updateUserDetails, whoAmI } from "../../services/userService";
import { useToast } from "../../context/ToastContext";
import { useNavigate } from "react-router-dom";


const MyDetails = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {showToast} = useToast();
    useEffect(() => {
        const fetchData = async () => {
        var response = await whoAmI();
            setFirstName(response.firstName);
            setLastName(response.lastName);
            setEmail(response.email);
        };
        fetchData();
    }, []);
    const onCancel = () => {
        const fetchData = async () => {
        var response = await whoAmI();
            setFirstName(response.firstName);
            setLastName(response.lastName);
            setEmail(response.email);
        };
        fetchData(); 
        showToast("Changes discarded", "error");
    }
    const onSave = async () => {
        const response = await updateUserDetails({firstName, lastName, password});
        if (!response.success) {
            showToast(response.message, "error");
            return;
        }
        showToast("Details updated successfully", "success");
        navigate("/")
    }

    return (
    <>
            <div className="main-my-details-content">
                <header>
                    <h2>My Details</h2>
                </header>
                    <section className="my-details-section">

                        <div className="form-field">
                            <label>First name</label>
                            <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>

                        <div className="form-field">
                            <label>Last name</label>
                            <input type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>

                        <div className="form-field">
                            <label>Email</label>
                            <p>{email}</p>
                        </div>

                        <div className="form-field">
                            <label>New password</label>
                            <input type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="form-actions">
                            <button className="btn-save" onClick={onSave}>Save Changes</button>
                            <button className="btn-cancel" onClick={onCancel}>Cancel</button>
                        </div>

                    </section>
            </div>
        </>
    ); 
};

export default MyDetails;