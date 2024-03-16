import { EmailShare, LinkedinShare, RedditShare, TwitterShare } from "react-share-kit";
import { Container } from "./Container";

export function SocialSharing({
  title,
  shareUrl
}: {
  title: string
  shareUrl: string

}) {
  
  return (
    <div className="flex justify-between w-48">
      <TwitterShare url={shareUrl} title={title} size={30}/>
      <LinkedinShare url={shareUrl} title={title} size={30}/>
      <RedditShare url={shareUrl} title={title} size={30}/>
      <EmailShare url={shareUrl} title={title} size={30}/>
    </div>
  );
}