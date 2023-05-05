import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setPermissions, setUserId } from "./redux/slices/userData";


const ProtectedComponent: React.FC<{ element: any, permission: string }> = ({ element, permission }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [tokenData, setTokenData] = useState<any>(null);

    const dispatch = useAppDispatch();
    const userData = useAppSelector((state) => state.userData)

    async function checkIfloggedIn() {
        try {
            // if has no token,
            // setTokenData(null)
            // return

            // if it does have a token, do as below

            let verifyResponse = await axios.post("/verify", {
                token: sessionStorage.getItem("token"),
            });
            const { userId, permissions } = verifyResponse.data.decoded.secretDecryptedData

            dispatch(setUserId(userId))
            dispatch(setPermissions(permissions))
            setTokenData(verifyResponse.data);
            console.log("verifyRes", verifyResponse.data);
        } catch (error) {
            console.log("error", error);
            setTokenData(null);
        }
        setIsLoading(false);
    }

    function hasPermission(validPermission: string, permissions: string[]) {
        return permissions.includes(validPermission)
    }
    useEffect(() => {
        checkIfloggedIn();
    }, []);


    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {tokenData ? (
                        <div>
                            {hasPermission(permission, userData.permissions) ? (
                                <div>{element}</div>
                            ) :
                                <div>You do not have permission to view this page</div>
                            }
                        </div>
                    ) : (
                        <Navigate to="/admin/login" />

                    )}
                </div>
            )}
        </div>
    );
};

export default ProtectedComponent