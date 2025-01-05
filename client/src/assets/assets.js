import sample_img_2 from './sample_img_2.png'
import step_icon_1 from './step_icon_1.svg'
import step_icon_2 from './step_icon_2.svg'
import step_icon_3 from './step_icon_3.svg'
import email_icon from './email_icon.svg'
import cross_icon from './cross_icon.svg'
import profile_icon from './profile_icon.png'

export const assets = {
    
    sample_img_2,
    email_icon,
    cross_icon,
    profile_icon
}

export const stepsData = [
    {
      title: 'Describe Your Vision',
      description: 'Type something that describes the image you want to create.',
      icon: step_icon_1,
    },
    {
      title: 'Watch it happen',
      description: 'My AI-powered engine will transform your text into a high-quality image in seconds.',
      icon: step_icon_2,
    },
    {
      title: 'Download & Share',
      description: 'Download your creation or share it with the world directly from my platform.',
      icon: step_icon_3,
    },
  ];

export const plans = [
    {
      id: 'Noob',
      price: 0,
      credits: 1,
      desc: ''
    },
    {
      id: 'Apprentice',
      price: 0,
      credits: 5,
      desc: ''
    },
    {
      id: 'Pro',
      price: 0,
      credits: 10,
      desc: ''
    },
  ]