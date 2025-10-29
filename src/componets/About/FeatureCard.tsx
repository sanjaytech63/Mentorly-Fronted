import { Feature } from "../../types/about.types";
import Card from "../Card";
import Icon from "./Icon";

const FeatureCard: React.FC<Feature> = ({ title, description, icon }) => {
    return (
        <Card
            className="text-center border border-gray-200  shadow-none h-full"
            hover={true}
            padding="lg"
        >
            <div className="flex justify-center mb-4">
                <Icon name={icon as any} size="large" className="text-4xl" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                {title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
                {description}
            </p>
        </Card>
    );
};

export default FeatureCard;