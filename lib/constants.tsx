import OverlayVideo from "../assets/img/tools/overlay.svg"
import Rotate from "../assets/img/tools/rotate.svg"
import Trim from "../assets/img/tools/trim.svg"
import Speed from "../assets/img/tools/speed_up_down.svg"
import Resize from "../assets/img/tools/resize.svg"
import OverlayImage from "../assets/img/tools/overlay_image.svg"
import Crop from "../assets/img/tools/crop.svg"
import Loop from "../assets/img/tools/loop.svg"
import Join from "../assets/img/tools/join.svg"

import HouseEdit from "@/assets/img/table/house_edit.svg"
import HouseEditUploaded from "@/assets/img/table/house_edit_uploaded.svg"
import HouseEditVideo from "@/assets/img/table/house_edit_video.svg"
import CarEditVideo from "@/assets/img/table/car_edit.svg"
import FootballEditVideo from "@/assets/img/table/football_edit.svg"
import FootballEditSuccess from "@/assets/img/table/football_edit_success.svg"

export const videoTools = [
  {name: "Overlay Video", icon: OverlayVideo},
  {name: "Rotate Video", icon: Rotate},
  {name: "Trim Video", icon: Trim},
  {name: "Speed Up/Down Video", icon: Speed},
  {name: "Resize Video", icon: Resize},
  {name: "Overlay Image on Video", icon: OverlayImage},
  {name: "Crop Video", icon: Crop},
  {name: "Loop Video", icon: Loop},
  {name: "Join Video/Image", icon: Join},
]

export const stats = [
  {
    label: "Credits",
    data: [
      {
        title: "Available",
        value: 273
      },
      {
        title: "In use",
        value: 35
      },
      {
        title: "Used",
        value: 20
      }
    ]
  },
  {
    label: "Job Status",
    data: [
      {
        title: "In progress",
        value: 5
      },
      {
        title: "Success",
        value: 4
      },
      {
        title: "Failed",
        value: 0
      }
    ]
  }
]

export const pricingPlanList = [
  {
    title: "Free Plan",
    credits: "500 Credits/ month",
    description: "Perfect for beginners eager to explore media editing and repurposing without any cost.",
    type: "monthly",
    typeDescription: "Billed monthly",
    originalPrice: 0,
    benefits: [
      "No Credit Card required",
      "Max 1 concurrent job",
      "2 hours of file storage",
      "50 credits/GB for content delivery",
      "Up to Full HD (1920 x 1080) or equivalent export"
    ]
  },
  {
    title: "Personal Plan",
    credits: "2000 Credits/ month",
    description: "Ideal for individuals seeking enhanced features for personal content creation and editing.",
    type: "monthly",
    typeDescription: "Billed monthly",
    originalPrice: 10,
    benefits: [
      "Max 3 concurrent jobs",
      "6 hours of file storage",
      "Email notifications",
      "25 credits/GB for content delivery",
      "Up to 4K (3840 x 2160) or equivalent export"
    ]
  },
  {
    title: "Personal Plan",
    credits: "2000 Credits/ month",
    description: "Ideal for individuals seeking enhanced features for personal content creation and editing.",
    type: "yearly",
    typeDescription: "Billed yearly",
    isDiscount: true,
    originalPrice: 9,
    discountPrice: 10,
    benefits: [
      "Max 3 concurrent jobs",
      "6 hours of file storage",
      "Email notifications",
      "50 credits/GB for content delivery",
      "Up to 4K (3840 x 2160) or equivalent export"
    ]
  },
  {
    title: "Professional Plan",
    credits: "12000 Credits/ month",
    description: "Tailored for professionals and teams aiming to elevate their media projects with advanced tools.",
    type: "monthly",
    typeDescription: "Billed monthly",
    originalPrice: 50,
    benefits: [
      "Max 10 concurrent jobs",
      "24 hours of file storage",
      "Email notifications",
      "25 credits/GB for content delivery",
      "Up to 4K (3840 x 2160) or equivalent export",
      "API Access"
    ]
  },
  {
    title: "Professional Plan",
    credits: "12000 Credits/ month",
    description: "Tailored for professionals and teams aiming to elevate their media projects with advanced tools.",
    type: "yearly",
    typeDescription: "Billed yearly",
    isDiscount: true,
    originalPrice: 45,
    discountPrice: 50,
    benefits: [
      "Max 10 concurrent jobs",
      "24 hours of file storage",
      "Email notifications",
      "50 credits/GB for content delivery",
      "Up to 4K (3840 x 2160) or equivalent export",
      "API Access"
    ]
  },
  {
    title: "Business Plan",
    credits: "25000 Credits/ month",
    description: "Comprehensive solution for businesses requiring robust media capabilities and premium support.",
    type: "monthly",
    typeDescription: "Billed monthly",
    originalPrice: 100,
    benefits: [
      "Max 20 concurrent jobs",
      "24 hours of file storage",
      "Email notifications",
      "25 credits/GB for content delivery",
      "Up to 4K (3840 x 2160) or equivalent export",
      "API Access",
      "Premium customer support"
    ]
  },
  {
    title: "Business Plan",
    credits: "25000 Credits/ month",
    description: "Comprehensive solution for businesses requiring robust media capabilities and premium support.",
    type: "yearly",
    typeDescription: "Billed yearly",
    isDiscount: true,
    originalPrice: 90,
    discountPrice: 100,
    benefits: [
      "Max 20 concurrent jobs",
      "24 hours of file storage",
      "Email notifications",
      "50 credits/GB for content delivery",
      "Up to 4K (3840 x 2160) or equivalent export",
      "API Access",
      "Premium customer support"
    ]
  }
];

export const tableData = [
  {
    icon: CarEditVideo,
    input_id: "#44544",
    file_name: "Car Edit",
    details: "View Details",
    credits_used: 20,
    status: "Failed",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEdit,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditVideo,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditVideo,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: CarEditVideo,
    input_id: "#44544",
    file_name: "Car Edit",
    details: "View Details",
    credits_used: 20,
    status: "Failed",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEdit,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditVideo,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditVideo,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditVideo,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditVideo,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditVideo,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditVideo,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditVideo,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditVideo,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditVideo,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditVideo,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditVideo,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditVideo,
    input_id: "#44544",
    file_name: "House Edit",
    details: "View Details",
    credits_used: 30,
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditVideo,
    input_id: "#44544",
    file_name: "Football Edit",
    details: "View Details",
    credits_used: 25,
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  }
];
export const uploadedFileTableData = [
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Car Edit",
    size: "20 MB",
    status: "Failed",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditUploaded,
    input_id: "#44545",
    file_name: "House Edit",
    size: "30 MB",
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    size: "25 MB",
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditUploaded,
    input_id: "#44544",
    file_name: "House Edit",
    size: "30 MB",
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    size: "25 MB",
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditUploaded,
    input_id: "#44544",
    file_name: "House Edit",
    size: "30 MB",
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    size: "25 MB",
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: HouseEditUploaded,
    input_id: "#44544",
    file_name: "House Edit",
    size: "30 MB",
    status: "Progress",
    output_id: "#44544",
    created_at: "Abcdef"
  },
  {
    icon: FootballEditSuccess,
    input_id: "#44544",
    file_name: "Football Edit",
    size: "25 MB",
    status: "Success",
    output_id: "#44544",
    created_at: "Abcdef"
  }
];

export const tableColumns = [
  {
    name: ""
  },
  {
    name: "Input File Id"
  }, {
    name: "Input File Name"
  }, {
    name: "Job Details"
  }, {
    name: "Credits Used"
  }, {
    name: "Status"
  }, {
    name: "Output File Id"
  }, {
    name: "Created at"
  },
  {
    name: ""
  }]
export const uploadedFilesColumns = [
  {
    name: ""
  },
  {
    name: "File Id"
  },
  {
    name: "File Name"
  },
  {
    name: "Size"
  }, {
    name: "Created At"
  },
  {
    name: ""
  }]

