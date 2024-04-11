import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipProps {
  label: string;
  amount: string;
  tooltipContent?: string;
}

const PriceWithTooltip = ({ label, amount, tooltipContent }: TooltipProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h2 className="text-black text-md font-normal text-right">{label}</h2>
        {tooltipContent && (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger type="button">
                <HelpCircle color="#666" width={15} height={15} />
              </TooltipTrigger>
              <TooltipContent className="w-44 h-full text-gray-500 text-sm text-center">
                <p>{tooltipContent}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <h3 className="text-black text-md font-semibold text-right">{amount}</h3>
    </div>
  );
};

export default PriceWithTooltip;
