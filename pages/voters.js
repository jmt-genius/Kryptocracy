import React, {useState, useEffect, useCallback,useContext} from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";

import {VotingContext} from "../context/Voter";
import Style from "../styles/voters.module.css";
import Button from "../components/Button/Button";       
import Input from "../components/Input/Input";

const allowedVoters = () => {
    const [fileUrl, setFileUrl] = useState(null);
    const [formInput, setFormInput]= useState({
        name:"",
        address:"",
        position:"",
    });

    const router=useRouter();
    const {uploadToIPFS}=useContext(VotingContext);

    // voters image drop
    const onDrop=useCallback(async (acceptedFil)=>{
        const url = await uploadToIPFS(acceptedFiles[0]);
        setFileUrl(url);
    });

    const {getRootProps}=useDropzone({
        onDrop,
    accept:"image/*",
maxSize:5000000,
    });

    //jsx part
    return (
    <div className={Style.createVoter}>
        <div>
            {fileUrl && (
                <div className={Style.voterInfo}>
                    <img src={fileUrl} alt="Voter image"/>
                    <div className={Style.voterInfo_paragraph}>
                        <p>
                            Name: <span>&nbps; {formInput.name}</span>
                        </p>
                        <p>
                            Add: &nbps; <span>{formInput.address.slice(0,20)}</span>
                        </p>
                        <p>
                            Pos: &nbps; <span>{formInput.position}</span>
                        </p>
                    </div>
                </div>
                    )}

                {
                    !fileUrl && (
                        <div className={Style.sideInfo}> 
                        <div className={Style.sideInfo_box}>
                            <h4>Create candidate For voting</h4>
                            <p>
                                Kryptocracy is a voting platform that allows you to create a candidate for voting
                            </p>
                        </div>
                        </div>
                    )
                }
        </div>
    </div>
    );
};

export default allowedVoters;