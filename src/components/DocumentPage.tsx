// import { Helmet } from "react-helmet-async";s

const DocumentPage: React.FC<{
  title: string;
  description: string;
  imageUrl: string;
}> = ({ title, description, imageUrl }) => {
  return (
    <>
    {/* // use Helmet for SEO */}
      <div> 
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Open Graph tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="website" />
      </div>

      <h1>{title}</h1>
      <p>{description}</p>
      <img src={imageUrl} alt="Preview" />
    </>
  );
};

export default DocumentPage;
