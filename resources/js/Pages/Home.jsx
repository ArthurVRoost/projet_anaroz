import Carousel from "@/Components/Carousel";
import Nav from "@/Components/Nav";

export default function Home({ bannerProducts, featuredProducts, shopProducts, bestSellers, offerProduct, categories, imageBaseUrl }) {
    return (
        <>
          <Nav/>
          <Carousel bannerProducts={bannerProducts} imageBaseUrl={imageBaseUrl} />
        </>
    );
}