import Link from "next/link";
import { useRouter } from "next/router";

import { Common } from "../../constants";
import baseUrl from "../../utils/baseUrl";
import Messages from "../../utils/messages";

interface Props {
  images: Image[];
}

const List = ({ images }: Props) => {
  const router = useRouter();

  const imgLinkPath = (image: Image): string => {
    if (image.postId) return `${Common.ResourcePaths.Post}${image.postId}`;
    if (image.motionId)
      return `${Common.ResourcePaths.Motion}${image.motionId}`;
    return router.asPath;
  };

  return (
    <>
      {images
        .slice()
        .reverse()
        .map((image) => {
          return (
            <Link href={imgLinkPath(image)} key={image.id}>
              <a>
                <img
                  src={baseUrl + image.path}
                  alt={Messages.images.couldNotRender()}
                  style={{
                    width: "100%",
                    display: "block",
                  }}
                />
              </a>
            </Link>
          );
        })}
    </>
  );
};

export default List;
