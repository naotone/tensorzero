import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Code } from "~/components/ui/code";
import { Link } from "react-router";
import { useConfig } from "~/context/config";
import {
  type TryWithVariantButtonProps,
  TryWithVariantButton,
} from "~/components/inference/TryWithVariantButton";
import type { ParsedDatasetRow } from "~/utils/clickhouse/datasets";
import { EditButton } from "~/components/utils/EditButton";
import { DeleteButton } from "~/components/utils/DeleteButton";
interface BasicInfoProps {
  datapoint: ParsedDatasetRow;
  tryWithVariantProps: TryWithVariantButtonProps;
  onDelete: () => void;
}

export default function BasicInfo({
  datapoint,
  tryWithVariantProps,
  onDelete,
}: BasicInfoProps) {
  const config = useConfig();
  const function_config = config.functions[datapoint.function_name];
  const type = function_config?.type;
  if (!type) {
    throw new Error(`Function ${datapoint.function_name} not found`);
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Basic Information</CardTitle>
        <div className="flex gap-2">
          <TryWithVariantButton {...tryWithVariantProps} />
          <EditButton onClick={() => (window.location.href = "#")} />
          <DeleteButton onClick={onDelete} />
        </div>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-lg font-semibold">Function</dt>
            <dd>
              <Link to={`/observability/functions/${datapoint.function_name}`}>
                <Code>{datapoint.function_name}</Code>
              </Link>
            </dd>
          </div>
          <div>
            <dt className="text-lg font-semibold">Episode ID</dt>
            <dd>
              <Link to={`/observability/episodes/${datapoint.episode_id}`}>
                <Code>{datapoint.episode_id}</Code>
              </Link>
            </dd>
          </div>
          <div>
            <dt className="text-lg font-semibold">Timestamp</dt>
            <dd>{new Date(datapoint.updated_at).toLocaleString()}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
