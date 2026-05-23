import { AboutMe } from "../components/home/aboutMe";
import { ProductosDestacadosSeccion } from "../components/home/productosDestacadosSeccion";

export const HomePage: React.FC = () => {
    return (
        <>
            <AboutMe />
            <hr className="section-divider" />
            <ProductosDestacadosSeccion /> 
        </>
    );
};