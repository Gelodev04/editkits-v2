import {MdOutlineLibraryAdd, MdOutlineVideoLibrary} from "react-icons/md";
import { AiOutlineRotateLeft } from "react-icons/ai";
import {LuFastForward, LuFileVideo2, LuRotateCw} from "react-icons/lu";
import {TbResize} from "react-icons/tb";
import {BsImages} from "react-icons/bs";
import {FaCropSimple} from "react-icons/fa6";



export const videoTools = [
    {name: "Overlay Video", icon: (<MdOutlineVideoLibrary size={48} color="#000" />)},
    {name: "Rotate Video", icon: <AiOutlineRotateLeft size={48} color="#000" />},
    {name: "Trim Video", icon: <LuFileVideo2 size={48} color="#000" />},
    {name: "Speed Up/Down Video", icon: <LuFastForward size={48} color="#000" />},
    {name: "Resize Video", icon: <TbResize size={48} color="#000" />},
    {name: "Overlay Image on Video", icon: <BsImages size={48} color="#000" />},
    {name: "Crop Video", icon: <FaCropSimple size={48} color="#000" />},
    {name: "Loop Video", icon: <LuRotateCw size={48} color="#000" />},
    {name: "Join Video/Image", icon: <MdOutlineLibraryAdd size={48} color="#000" />},
]