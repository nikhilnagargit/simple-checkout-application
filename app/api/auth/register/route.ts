import { NextResponse } from "next/server";
import {hash} from "bcrypt";

export  async function POST(request:Request) {

    try{
        const {email,password}  = await request.json();

        // validate the email and password server side

        console.log(email,password);
        const hashedPassword = await hash(password,10);
    }
    catch(e){
        console.log(e);
    }
    return NextResponse.json({message:'success'});
}


