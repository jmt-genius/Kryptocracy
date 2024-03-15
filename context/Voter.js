import React,{useState,useEffect} from 'react';
import Web3Modal from 'web3modal';
import {ethers} from 'ethers';
import {create as ipfsHttpClient} from 'ipfs-http-client';
import axios from "axios";
import {useRouter} from "next/router";

import {votingAddress,VotingAddressABI } from "./constants";
const client=ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const fetchContract=(signerOrProvider) => {
    new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider);
};
    export const VotingContext=React.createContext();

    export const VotingProvider=({ children })=>{
        const votingTitle='Kryptocracy';
        const router=useRouter();
        const [currentAccount, setCuurentAccount]=useState("");
        const [candidateLength, setCandidateLength]=useState('');
        const pushCandidate=[];
        const candidateIndex=[];
        const [candidateArray,setCandidateArray]=useState(pushCandidate);

        const [error,setError]=useState('');
        const higestVote=[];

        const pushVoter=[];
        const [voterArray,setVoterArray]=useState(pushVoter);
        const [voterLength,setVoterLength]=useState('');
        const [voterAddress,setVoterAddress]=useState([]);
        
        const checkIfWalletIsConnected=async()=>{
            if(!window.ethereum) return setError("Please Install MetaMask");

            const account=await window.ethereum.request({method:"eth_accounts"});

            if(account.length){
                setCuurentAccount(account[0]);
            }
            else{
                setError("Please Install Metamask & Connect, Reload");
            }
        };

        // connect wallet
        const connectWallet=async()=>{
            if(!window.ethereum) return setError("Please Install MetaMask");
            const account= await window.ethereum.request({
                method:"eth_requestAccounts",
            });
            setCuurentAccount(account[0]);
        };

        // upload to IPFS voter image
        const uploadToIPFS=async(file)=>{
            try{
                const added=await client.add(file);
                const url=`https://ipfs.infura.io/ipfs/${added.path}`;
                return url;
            } catch(error){
                console.log("Error uploading file to IPFS");
            }   
        };
        return (
            <VotingContext.Provider 
                value={{
                    votingTitle, 
                    checkIfWalletIsConnected, 
                    connectWallet,
                    uploadToIPFS,
                }}
                >
                    {children}
                </VotingContext.Provider>
        );
};

const Voter=()=>{
    return (
        <div>

        </div>
    )
}