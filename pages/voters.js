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
    return <div>allowed-voters</div>
}

export default allowedVoters;