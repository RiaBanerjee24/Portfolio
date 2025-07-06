import Riaprofile from '../../assets/images/Riaprofile.jpeg';

interface ProfileImageProps {
  className?: string;  // Optional string prop for className
}

const ProfileImage: React.FC<ProfileImageProps> = ({ className }) => {
  return (
    <div className={`${className} overflow-hidden rounded-full border-4 border-black`}>
      <img 
        src={Riaprofile} 
        alt="Profile" 
        className="w-full h-full object-cover" 
      />
    </div>
  );
};

export default ProfileImage;
