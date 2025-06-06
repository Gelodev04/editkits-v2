import Crop from '../public/images/tools/crop.svg';
import Join from '../public/images/tools/join.svg';
import Loop from '../public/images/tools/loop.svg';
import OverlayVideo from '../public/images/tools/overlay.svg';
import Resize from '../public/images/tools/resize.svg';
import Rotate from '../public/images/tools/rotate.svg';
import Speed from '../public/images/tools/speed_up_down.svg';
import Trim from '../public/images/tools/trim.svg';

import CropHover from '../public/images/tools/crop_hover.svg';
import JoinHover from '../public/images/tools/join_hover.svg';
import LoopHover from '../public/images/tools/loop_hover.svg';
import OverlayVideoHover from '../public/images/tools/overlay_hover.svg';
import ResizeHover from '../public/images/tools/resize_hover.svg';
import RotateHover from '../public/images/tools/rotate_hover.svg';
import SpeedHover from '../public/images/tools/speed_up_down_hover.svg';
import TrimHover from '../public/images/tools/trim_hover.svg';

import ChatIcon from '@/public/icons/chat.svg';
import SearchIcon from '@/public/icons/search.svg';
import SmileIcon from '@/public/icons/smile.svg';
import BudgetFriendly from '@/public/images/features/budget_friendly.svg';
import Dashboard from '@/public/images/features/dashboard.svg';
import DeveloperAPI from '@/public/images/features/developer_api.svg';
import EditingTools from '@/public/images/features/editing_tools.svg';
import FastProcessing from '@/public/images/features/fast_processing.svg';
import FileFormats from '@/public/images/features/file_formats.svg';
import FreePlan from '@/public/images/features/free_plan.svg';
import MultiTasking from '@/public/images/features/mutlitasking.svg';
import NoWatermarks from '@/public/images/features/no_water_marks.svg';
import Storage from '@/public/images/features/storage.svg';
import VideoRendering from '@/public/images/features/video_rendering.svg';

export const benefits = [
  'No Credit Card required',
  'Max 1 concurrent job',
  '2 hours of file storage',
  '50 credits/GB for content delivery',
  'Up to FHD (1920 x 1080) or equivalent export',
];

export const videoTools = [
  {
    name: 'Overlay Image on Video',
    icon: OverlayVideo,
    icon_hover: OverlayVideoHover,
    description:
      'Add logos, watermarks, or custom graphics to your videos. Great for branding, tutorials, or visual enhancements.',
  },
  {
    name: 'Rotate/Flip Video',
    icon: Rotate,
    icon_hover: RotateHover,
    description:
      'Rotate videos 90°, 180°, or flip horizontally/vertically. Fix orientation issues or add stylistic effects easily.',
  },
  {
    name: 'Trim Video',
    icon: Trim,
    icon_hover: TrimHover,
    description:
      'Cut unwanted sections from your video to keep only what matters. Perfect for shortening clips and removing unnecessary content.',
  },
  {
    name: 'Speed Up/Down Video',
    icon: Speed,
    icon_hover: SpeedHover,
    description:
      'Control playback speed to create slow motion or time-lapse effects. Adjust video pacing for dramatic or fast-forward visuals.',
  },
  {
    name: 'Resize Video',
    icon: Resize,
    icon_hover: ResizeHover,
    description:
      'Change video resolution and dimensions to fit any platform. Great for optimizing videos for social media, mobile, or web.',
  },
  {
    name: 'Crop Video',
    icon: Crop,
    icon_hover: CropHover,
    description:
      'Remove edges or unwanted parts of your video frame. Ideal for focusing on a subject or resizing for different aspect ratios.',
  },
  {
    name: 'Loop Video',
    icon: Loop,
    icon_hover: LoopHover,
    description:
      'Repeat your video multiple times for continuous playback. Useful for creating looping reels, gifs, or background videos.',
  },
  {
    name: 'Join Videos/Images',
    icon: Join,
    icon_hover: JoinHover,
    description:
      'Combine multiple videos or images into a single continuous video. Create seamless montages, slideshows, or compilations.',
  },
  {
    name: 'Compress video',
    icon: OverlayVideo,
    icon_hover: OverlayVideoHover,
    description:
      'Reduce video file size without major quality loss. Perfect for faster uploads, storage savings, and optimized delivery.',
  },
  {
    name: 'Overlay Video on Video',
    icon: OverlayVideo,
    icon_hover: OverlayVideoHover,
    description:
      'Insert one video over another with picture-in-picture effects. Ideal for commentary, reaction videos, or multi-camera views.',
  },
];

export const featureCards = [
  {
    name: 'Professional 4K Video Rendering',
    image: VideoRendering,
    description:
      'Render stunning, cinema-quality videos in up to 4K resolution. Perfect for creators who demand crisp visuals and smooth playback, ensuring your content stands out on any platform.',
  },
  {
    name: 'Intuitive Yet Advanced Editing Tools',
    image: EditingTools,
    description:
      "A beginner-friendly interface packed with professional-grade tools. Trim, filter, and enhance media effortlessly, even if you're new to editing.",
  },
  {
    name: 'Free Plan For Beginners',
    image: FreePlan,
    description:
      'Jump in with a free plan offering loads of features and access to all the tools. Perfect for testing the waters or small projects—no credit card required.',
  },
  {
    name: 'Lightning-Fast Processing Speeds',
    image: FastProcessing,
    description:
      'Process massive 4K videos and high-res assets in the background. Our cutting-edge cloud infrastructure delivers rapid encoding, editing, and exporting without hogging your system.',
  },
  {
    name: 'Transparent And Budget-Friendly Pricing',
    image: BudgetFriendly,
    description:
      'No hidden fees, no surprises. Choose from flexible plans designed for freelancers, teams, and enterprises—all with straightforward pricing that scales with your needs.',
  },
  {
    name: 'Centralized Dashboard For Total Control',
    image: Dashboard,
    description:
      'Monitor projects, track progress, and manage workflows in real time. A dashboard with all the details to prioritize tasks, view analytics, and stay organized.',
  },
  {
    name: 'Developer-Friendly APIs',
    image: DeveloperAPI,
    description:
      'Integrate every feature into your workflow with robust APIs. Build custom solutions, automate workflows, and scale your app with comprehensive documentation.',
  },
  {
    name: 'Store Your Videos, Photos, And Audio',
    image: Storage,
    description:
      'Store videos, photos, and audio files in a secure, searchable cloud library. Access your assets anytime, anywhere, and download them easily.',
  },
  {
    name: 'Multi-Task Like A Pro',
    image: MultiTasking,
    description:
      'Run jobs simultaneously without slowdowns. Edit videos, process images, and export files in parallel—maximize productivity and hit deadlines faster.',
  },
  {
    name: 'Zero Watermarks, Pure Professionalism',
    image: NoWatermarks,
    description:
      'Keep your content 100% yours—no intrusive logos or branding. Export polished videos, images, and audio files that showcase your brand, not ours.',
  },
  {
    name: 'Various File Format Support',
    image: FileFormats,
    description:
      'Import various formats like MP4, MOV, PNG, WAV, and many others. Convert files seamlessly—ideal for cross-platform projects.',
  },
  {
    name: 'Tailored Plans For Every User',
    image: BudgetFriendly,
    description:
      'From hobbyists to Fortune 500 teams, find a plan that fits. Upgrade, downgrade, or mix-and-match features to suit your evolving needs.',
  },
];

export const stats = [
  {
    label: 'Credits',
    data: [
      {
        title: 'Available',
        value: 273,
      },
      {
        title: 'In use',
        value: 35,
      },
      {
        title: 'Used',
        value: 20,
      },
    ],
  },
  {
    label: 'Job Status',
    data: [
      {
        title: 'In progress',
        value: 5,
      },
      {
        title: 'Success',
        value: 4,
      },
      {
        title: 'Failed',
        value: 0,
      },
    ],
  },
];

export const jobStatusColumns: { key?: string; name?: string }[] = [
  {
    name: 'Thumbnail',
  },
  {
    key: 'input_file_id',
    name: 'Input File(s)',
  },
  {
    key: 'input_file_name',
    name: 'Input File Name',
  },
  {
    key: 'type',
    name: 'Type',
  },
  {
    key: 'created_at',
    name: 'Created At',
  },
  {
    key: 'tools_used',
    name: 'Tools Used',
  },
  {
    key: 'credits_required',
    name: 'Credits Required',
  },
  {
    key: 'status',
    name: 'Status',
  },
  {
    key: 'output_file',
    name: 'Output File',
  },
  {},
  {},
];

export const uploadedFilesColumns = [
  {
    key: 'thumbnail_url',
    name: 'Thumbnail',
  },
  {
    key: 'id',
    name: 'File ID',
  },
  {
    key: 'name',
    name: 'File Name',
  },
  {
    key: 'size_in_mb',
    name: 'Size',
  },
  {
    key: 'type',
    name: 'Type',
  },
  {
    key: 'created_at',
    name: 'Created At',
  },
  {
    key: 'expires_at',
    name: 'Expires At',
  },
  {
    key: 'actions',
    name: 'Actions',
  },
];

export const aspectRatio = [
  { label: 'Custom', value: 'Custom' },
  { label: '16:9 (Widescreen)', value: '16:9' },
  { label: '4:3 (Standard)', value: '4:3' },
  { label: '21:9 (Ultrawide)', value: '21:9' },
  { label: '1:1 (Square)', value: '1:1' },
  { label: '3:2', value: '3:2' },
  { label: '5:4', value: '5:4' },
  { label: '16:10', value: '16:10' },
  { label: '32:9 (Super Ultrawide)', value: '32:9' },
  { label: '9:16 (Portrait)', value: '9:16' },
];

export const outputQualityList = [
  { label: 'Low', value: 'LOW' },
  { label: 'Medium', value: 'MEDIUM' },
  { label: 'High', value: 'HIGH' },
  { label: 'Best', value: 'BEST' },
];

export const videoType = [{ label: 'mp4', value: 'mp4' }];

export const presets = [
  { label: 'None', value: 'None' },
  { label: 'Facebook, 9:16, 1080x1920', value: 'Facebook, 9:16, 1080x1920' },
  { label: 'Instagram, 9:16, 1080x1920', value: 'Instagram, 9:16, 1080x1920' },
  { label: 'Instagram Feed, 4:5, 1080x1350', value: 'Instagram Feed, 4:5, 1080x1350' },
  { label: 'Instagram Feed, 1:1, 1080x1080', value: 'Instagram Feed, 1:1, 1080x1080' },
  { label: 'Tiktok, 9:16, 1080x1920', value: 'Tiktok, 9:16, 1080x1920' },
];

export const contactUsSections = [
  {
    icon: SearchIcon,
    title: 'Missing A Tool? Let Us Build It!',
    description:
      "Didn't find the tool you need? We're constantly expanding EditKits and your request might be next. Whether it's a new video, audio, or image tool, let us know—we'd love to create something that fits your workflow!",
  },
  {
    icon: ChatIcon,
    title: "Facing Issues? We've Got Your Back!",
    description:
      "Having trouble with EditKits? Whether it's a bug, integration issue, or something not working as expected, we're here to help. Reach out, and our team will assist you in resolving the issue quickly so you can get back to creating!",
  },
  {
    icon: SmileIcon,
    title: "Let's Collaborate & Scale Together!",
    description:
      "Looking to integrate EditKits into your business, scale your media workflows, or discuss a partnership? We'd love to explore how we can work together to create powerful solutions tailored to your needs. Let's make something amazing happen!",
  },
];

export const jsonLdData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'EditKits',
  url: 'https://editkits.com',
  description:
    'EditKits is the ultimate cloud-based media editing platform offering powerful APIs for fast, scalable, and cost-effective video, image, and audio processing.',
  publisher: {
    '@type': 'Organization',
    name: 'EditKits',
    url: 'https://editkits.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://editkits.com/logo.svg',
    },
    sameAs: [
      'https://en.wikipedia.org/wiki/Video_editing',
      'https://www.producthunt.com/',
      'https://www.g2.com/categories/video-editing',
      'https://www.capterra.com/video-editing-software/',
      'https://www.trustpilot.com/',
      'https://www.reddit.com/r/videoediting/',
      'https://www.quora.com/topic/Video-Editing',
      'https://stackoverflow.com/questions/tagged/video-processing',
      'https://medium.com/tag/video-editing',
      'https://www.linkedin.com/pulse/',
      'https://www.goodfirms.co/video-editing-software/',
      'https://www.slashdot.org/',
      'https://www.sitejabber.com/',
      'https://betalist.com/',
      'https://www.startupranking.com/',
      'https://alternativeto.net/',
      'https://www.saashub.com/',
      'https://www.techcrunch.com/',
      'https://news.ycombinator.com/',
      'https://www.indiehackers.com/',
      'https://dev.to/',
      'https://www.makeuseof.com/',
      'https://www.smashingmagazine.com/',
      'https://www.wired.com/',
      'https://www.forbes.com/innovation/',
      'https://www.zdnet.com/',
      'https://www.cnet.com/topics/software/',
      'https://www.digitaltrends.com/',
      'https://www.entrepreneur.com/topic/technology',
      'https://www.founderclub.com/',
      'https://angel.co/startups',
      'https://www.appsumo.com/',
      'https://www.crunchbase.com/',
      'https://www.getapp.com/',
      'https://www.softwareadvice.com/',
      'https://www.saasworthy.com/',
      'https://www.expertreviews.co.uk/',
      'https://www.theverge.com/',
      'https://www.venturebeat.com/',
      'https://www.mashable.com/',
      'https://www.pcmag.com/',
      'https://www.ghacks.net/',
      'https://www.programmableweb.com/',
      'https://www.the-next-web.com/',
      'https://www.cmswire.com/',
      'https://www.technologyreview.com/',
      'https://www.datamation.com/',
    ],
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://editkits.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};
