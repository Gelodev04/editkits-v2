import {MdOutlineLibraryAdd, MdOutlineVideoLibrary} from "react-icons/md";
import { AiOutlineRotateLeft } from "react-icons/ai";
import {LuFastForward, LuFileVideo2, LuRotateCw} from "react-icons/lu";
import {TbResize} from "react-icons/tb";
import {BsImages} from "react-icons/bs";
import {FiCrop} from "react-icons/fi";

export const videoTools = [
    {name: "Overlay Video", icon: (<MdOutlineVideoLibrary size={48} color="#3f3f46" />)},
    {name: "Rotate Video", icon: <AiOutlineRotateLeft size={48} color="#3f3f46" />},
    {name: "Trim Video", icon: <LuFileVideo2 size={48} color="#3f3f46" />},
    {name: "Speed Up/Down Video", icon: <LuFastForward size={48} color="#3f3f46" />},
    {name: "Resize Video", icon: <TbResize size={48} color="#3f3f46" />},
    {name: "Overlay Image on Video", icon: <BsImages size={48} color="#3f3f46" />},
    {name: "Crop Video", icon: <FiCrop size={48} color="#3f3f46" />},
    {name: "Loop Video", icon: <LuRotateCw size={48} color="#3f3f46" />},
    {name: "Join Video/Image", icon: <MdOutlineLibraryAdd size={48} color="#3f3f46" />},
]