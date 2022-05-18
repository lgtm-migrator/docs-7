import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

export const WebVarExample = ({
  keyName,
  value,
  valueOfDotEnv,
  descriptionOfDotEnv,
  valueOfVercel,
  descriptionOfVercel,
}) => {
  return (
    <Tabs groupId="envType">
      <TabItem value="dotenv" label=".env.local, .env">
        <p>
          <code>
            {keyName}={valueOfDotEnv ?? value}
          </code>
        </p>
        {descriptionOfDotEnv == null ? null : <p>{descriptionOfDotEnv}</p>}
      </TabItem>
      <TabItem value="vercel" label="Vercel">
        <p>
          KEY: <code>{keyName}</code>
          <br />
          VALUE: <code>{valueOfVercel ?? value}</code>
        </p>
        {descriptionOfVercel == null ? null : <p>{descriptionOfVercel}</p>}
      </TabItem>
    </Tabs>
  );
};
