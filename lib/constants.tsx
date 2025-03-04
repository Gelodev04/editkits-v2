import OverlayVideo from "../assets/img/tools/overlay.svg"
import Rotate from "../assets/img/tools/rotate.svg"
import Trim from "../assets/img/tools/trim.svg"
import Speed from "../assets/img/tools/speed_up_down.svg"
import Resize from "../assets/img/tools/resize.svg"
import OverlayImage from "../assets/img/tools/overlay_image.svg"
import Crop from "../assets/img/tools/crop.svg"
import Loop from "../assets/img/tools/loop.svg"
import Join from "../assets/img/tools/join.svg"

import OverlayVideoHover from "../assets/img/tools/overlay_hover.svg"
import RotateHover from "../assets/img/tools/rotate_hover.svg"
import TrimHover from "../assets/img/tools/trim_hover.svg"
import SpeedHover from "../assets/img/tools/speed_up_down_hover.svg"
import ResizeHover from "../assets/img/tools/resize_hover.svg"
import OverlayImageHover from "../assets/img/tools/overlay_image_hover.svg"
import CropHover from "../assets/img/tools/crop_hover.svg"
import LoopHover from "../assets/img/tools/loop_hover.svg"
import JoinHover from "../assets/img/tools/join_hover.svg"

import HouseEdit from "@/assets/img/table/house_edit.svg"
import HouseEditUploaded from "@/assets/img/table/house_edit_uploaded.svg"
import HouseEditVideo from "@/assets/img/table/house_edit_video.svg"
import CarEditVideo from "@/assets/img/table/car_edit.svg"
import FootballEditVideo from "@/assets/img/table/football_edit.svg"
import FootballEditSuccess from "@/assets/img/table/football_edit_success.svg"

import VideoRendering from "@/assets/img/features/video_rendering.svg"
import EditingTools from "@/assets/img/features/editing_tools.svg"
import FreePlan from "@/assets/img/features/free_plan.svg"
import FastProcessing from "@/assets/img/features/fast_processing.svg"
import BudgetFriendly from "@/assets/img/features/budget_friendly.svg"
import Dashboard from "@/assets/img/features/dashboard.svg"
import DeveloperAPI from "@/assets/img/features/developer_api.svg"
import Storage from "@/assets/img/features/storage.svg"
import MultiTasking from "@/assets/img/features/mutlitasking.svg"
import NoWatermarks from "@/assets/img/features/no_water_marks.svg"
import FileFormats from "@/assets/img/features/file_formats.svg"
import SearchIcon from "@/assets/icons/search.svg";
import ChatIcon from "@/assets/icons/chat.svg";
import SmileIcon from "@/assets/icons/smile.svg";

export const videoTools = [
  {name: "Overlay Video", icon: OverlayVideo, icon_hover: OverlayVideoHover},
  {name: "Rotate Video", icon: Rotate, icon_hover: RotateHover},
  {name: "Trim Video", icon: Trim, icon_hover: TrimHover},
  {name: "Speed Up/Down Video", icon: Speed, icon_hover: SpeedHover},
  {name: "Resize Video", icon: Resize, icon_hover: ResizeHover},
  {name: "Overlay Image on Video", icon: OverlayImage, icon_hover: OverlayImageHover},
  {name: "Crop Video", icon: Crop, icon_hover: CropHover},
  {name: "Loop Video", icon: Loop, icon_hover: LoopHover},
  {name: "Join Video/Image", icon: Join, icon_hover: JoinHover},
]

export const featureCards = [
  {
    name: "Professional 4K Video Rendering",
    image: VideoRendering,
    description: "Render stunning, cinema-quality videos in up to 4K resolution. Perfect for creators who demand crisp visuals and smooth playback, ensuring your content stands out on any platform."
  },
  {
    name: "Intuitive Yet Advanced Editing Tools",
    image: EditingTools,
    description: "A beginner-friendly interface packed with professional-grade tools. Trim, filter, and enhance media effortlessly, even if you're new to editing."
  },
  {
    name: "Free Plan For Beginners",
    image: FreePlan,
    description: "Jump in with a free plan offering loads of features and access to all the tools. Perfect for testing the waters or small projects—no credit card required."
  },
  {
    name: "Lightning-Fast Processing Speeds",
    image: FastProcessing,
    description: "Process massive 4K videos and high-res assets in the background. Our cutting-edge cloud infrastructure delivers rapid encoding, editing, and exporting without hogging your system."
  },
  {
    name: "Transparent And Budget-Friendly Pricing",
    image: BudgetFriendly,
    description: "No hidden fees, no surprises. Choose from flexible plans designed for freelancers, teams, and enterprises—all with straightforward pricing that scales with your needs."
  },
  {
    name: "Centralized Dashboard For Total Control",
    image: Dashboard,
    description: "Monitor projects, track progress, and manage workflows in real time. A dashboard with all the details to prioritize tasks, view analytics, and stay organized."
  },
  {
    name: "Developer-Friendly APIs",
    image: DeveloperAPI,
    description: "Integrate every feature into your workflow with robust APIs. Build custom solutions, automate workflows, and scale your app with comprehensive documentation."
  },
  {
    name: "Store Your Videos, Photos, And Audio",
    image: Storage,
    description: "Store videos, photos, and audio files in a secure, searchable cloud library. Access your assets anytime, anywhere, and download them easily."
  },
  {
    name: "Multi-Task Like A Pro",
    image: MultiTasking,
    description: "Run jobs simultaneously without slowdowns. Edit videos, process images, and export files in parallel—maximize productivity and hit deadlines faster."
  },
  {
    name: "Zero Watermarks, Pure Professionalism",
    image: NoWatermarks,
    description: "Keep your content 100% yours—no intrusive logos or branding. Export polished videos, images, and audio files that showcase your brand, not ours."
  },
  {
    name: "Various File Format Support",
    image: FileFormats,
    description: "Import various formats like MP4, MOV, PNG, WAV, and many others. Convert files seamlessly—ideal for cross-platform projects."
  },
  {
    name: "Tailored Plans For Every User",
    image: BudgetFriendly,
    description: "From hobbyists to Fortune 500 teams, find a plan that fits. Upgrade, downgrade, or mix-and-match features to suit your evolving needs."
  }
];



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
    title: "Free",
    credits: "12000 Credits / month",
    description: "Perfect for beginners eager to explore media editing and repurposing without any cost.",
    type: "monthly",
    typeDescription: "Billed monthly",
    originalPrice: 0,
    mostPopular: false,
    benefits: [
      "No Credit Card required",
      "Max 1 concurrent job",
      "2 hours of file storage",
      "50 credits/GB for content delivery",
      "Up to FHD (1920 x 1080) or equivalent export"
    ]
  },
  {
    title: "Personal",
    credits: "12000 Credits / month",
    description: "Ideal for individuals seeking enhanced features for personal content creation and editing.",
    type: "monthly",
    typeDescription: "Billed monthly",
    originalPrice: 10,
    mostPopular: false,
    benefits: [
      "Max 3 concurrent jobs",
      "6 hours of file storage",
      "Email notifications",
      "25 credits/GB for content delivery",
      "Up to 4K (3840 x 2160) or equivalent export"
    ]
  },
  {
    title: "Personal",
    credits: "12000 Credits / month",
    description: "Ideal for individuals seeking enhanced features for personal content creation and editing.",
    type: "yearly",
    typeDescription: "Billed yearly",
    isDiscount: true,
    originalPrice: 9,
    discountPrice: 10,
    mostPopular: false,
    benefits: [
      "Max 3 concurrent jobs",
      "6 hours of file storage",
      "Email notifications",
      "50 credits/GB for content delivery",
      "Up to 4K (3840 x 2160) or equivalent export"
    ]
  },
  {
    title: "Professional",
    credits: "12000 Credits / month",
    description: "Tailored for professionals and teams aiming to elevate their media projects with advanced tools.",
    type: "monthly",
    typeDescription: "Billed monthly",
    originalPrice: 50,
    mostPopular: true,
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
    title: "Professional",
    credits: "12000 Credits / month",
    description: "Tailored for professionals and teams aiming to elevate their media projects with advanced tools.",
    type: "yearly",
    typeDescription: "Billed yearly",
    isDiscount: true,
    originalPrice: 45,
    discountPrice: 50,
    mostPopular: true,
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
    title: "Business",
    credits: "25000 Credits / month",
    description: "Comprehensive solution for businesses requiring robust media capabilities and premium support.",
    type: "monthly",
    typeDescription: "Billed monthly",
    originalPrice: 100,
    mostPopular: false,
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
    title: "Business",
    credits: "25000 Credits / month",
    description: "Comprehensive solution for businesses requiring robust media capabilities and premium support.",
    type: "yearly",
    typeDescription: "Billed yearly",
    isDiscount: true,
    originalPrice: 90,
    discountPrice: 100,
    mostPopular: false,
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


export const aspectRatio = [
  {label: "Custom", value: "Custom"},
  {label: "16:9 (Widescreen)", value: "16:9"},
  {label: "4:3 (Standard)", value: "4:3"},
  {label: "21:9 (Ultrawide)", value: "21:9"},
  {label: "1:1 (Square)", value: "1:1"},
  {label: "3:2", value: "3:2"},
  {label: "5:4", value: "5:4"},
  {label: "16:10", value: "16:10"},
  {label: "32:9 (Super Ultrawide)", value: "32:9"},
  {label: "9:16 (Portrait)", value: "9:16"},
]

export const outputQualityList = [
  {label: "LOW", value: "LOW"},
  {label: "MEDIUM", value: "MEDIUM"},
  {label: "HIGH", value: "HIGH"},
  {label: "BEST", value: "BEST"}
]

export const videoType = [
  {label: "mp4", value: "mp4"},
  {label: "mov", value: "mov"},
  {label: "avi", value: "avi"}
]

export const presets = [
  { label: "None", value: "None" },
  { label: "Facebook, 9:16, 1080x1920", value: "Facebook, 9:16, 1080x1920" },
  { label: "Instagram, 9:16, 1080x1920", value: "Instagram, 9:16, 1080x1920" },
  { label: "Instagram Feed, 4:5, 1080x1350", value: "Instagram Feed, 4:5, 1080x1350" },
  { label: "Instagram Feed, 1:1, 1080x1080", value: "Instagram Feed, 1:1, 1080x1080" },
  { label: "Tiktok, 9:16, 1080x1920", value: "Tiktok, 9:16, 1080x1920" },
]


export const contactUsSections = [
  {
    icon: SearchIcon,
    title: "Missing A Tool? Let Us Build It!",
    description: "Didn’t find the tool you need? We’re constantly expanding EditKits and your request might be next. Whether it’s a new video, audio, or image tool, let us know—we’d love to create something that fits your workflow!"
  },
  {
    icon: ChatIcon,
    title: "Facing Issues? We’ve Got Your Back!",
    description: "Having trouble with EditKits? Whether it's a bug, integration issue, or something not working as expected, we’re here to help. Reach out, and our team will assist you in resolving the issue quickly so you can get back to creating!"
  },
  {
    icon: SmileIcon,
    title: "Let’s Collaborate & Scale Together!",
    description: "Looking to integrate EditKits into your business, scale your media workflows, or discuss a partnership? We’d love to explore how we can work together to create powerful solutions tailored to your needs. Let’s make something amazing happen!"
  }
]