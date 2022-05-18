import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

export const ApiVarExample = ({
  keyName,
  value,
  valueOfDotEnv,
  descriptionOfDotEnv,
  valueOfHeroku,
  descriptionOfHeroku,
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
      <TabItem value="heroku" label="Heroku">
        <p>
          KEY: <code>{keyName}</code>
          <br />
          VALUE: <code>{valueOfHeroku ?? value}</code>
        </p>
        {descriptionOfHeroku == null ? null : <p>{descriptionOfHeroku}</p>}
      </TabItem>
    </Tabs>
  );
};
