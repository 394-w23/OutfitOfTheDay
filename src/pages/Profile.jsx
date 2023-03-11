import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useProfile } from "../utils/userProfile";

const Profile = () => {
  const [user] = useProfile();

  if (!user) return <h5 className="text-muted">Loading user profile...</h5>;

  return (
    <div className="view-profile">
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard
              style={{
                width: "595px",
                borderRadius: "15px",
                alignContent: "center",
                padding: "5px",
              }}
            >
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: "180px", borderRadius: "10px" }}
                      src={user.photoURL}
                      alt="Generic placeholder image"
                      fluid
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>{user.displayName}</MDBCardTitle>
                    <MDBCardText>{user.email}</MDBCardText>

                    <div
                      className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: "#efefef" }}
                    >
                      <div>
                        <p className="small text-muted mb-1">Favorites</p>
                        <p className="mb-0">4</p>
                      </div>
                      <div className="px-3">
                        <p className="small text-muted mb-1">Closet</p>
                        <p className="mb-0">22</p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">Followers</p>
                        <p className="mb-0">8</p>
                      </div>
                    </div>
                    <div className="d-flex pt-1">
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Profile;
