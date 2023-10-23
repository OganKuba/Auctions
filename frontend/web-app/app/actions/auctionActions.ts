'use server'

import { fetchWrapper } from "@/app/lib/fetchWrapper";
import { Auction, Bid, PagedResult } from "@/types";
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { revalidatePath } from "next/cache";
import {cookies, headers} from 'next/headers';
import { FieldValue, FieldValues } from "react-hook-form";
import { AiTwotonePlayCircle } from "react-icons/ai";

export async function getData(query: string): Promise<PagedResult<Auction>>{
    return await fetchWrapper.get(`search${query}`);
}
export async function updateAuctionTest(){
    
    const data = {
        mileage: Math.floor(Math.random() * 100000)+1
    }
    return await fetchWrapper.put('auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c', data);
}   
export async function getTokenWorkaround(){
    const req = {
        headers: Object.fromEntries(headers() as Headers),
        cookies: Object.fromEntries(
            cookies()
                .getAll()
                .map((c) => [c.name, c.value])
        )
    } as NextApiRequest;
    return await getToken({req});
}
export async function createAuction(data: FieldValues){
    return fetchWrapper.post('auctions', data);
}
export async function getDetailedViewData(id: string): Promise<Auction>{
    return fetchWrapper.get(`auctions/${id}`);
}
export async function updateAuction(data: FieldValues, id: string){
    const res = await fetchWrapper.put(`auctions/${id}`, data);
    revalidatePath(`/auctions/${id}`);
    return res;
}
export async function deleteAuction(id: string){
    return await fetchWrapper.del(`auctions/${id}`);
}
export async function getBidsForAuction(id: string): Promise<Bid[]>{
    return await fetchWrapper.get(`bids/${id}`);
}
export async function placeBidForAuction(auctionId: string , amount: number){
    return await fetchWrapper.post(`bids?auctionId=${auctionId}&amount=${amount}`, {});
}

