/*!
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { forwardRef } from "react";
import { Flex } from "@chakra-ui/react";

import { getMetaValue } from "src/utils";
import LinkButton from "src/components/LinkButton";
import type { Task } from "src/types";
import URLSearchParamsWrapper from "src/utils/URLSearchParamWrapper";

const dagId = getMetaValue("dag_id");
const taskInstancesUrl = getMetaValue("task_instances_list_url");
const taskUrl = getMetaValue("task_url");

interface Props {
  taskId: Task["id"];
  logicalDate: string;
  isMapped?: boolean;
  mapIndex?: number;
}

const Nav = forwardRef<HTMLDivElement, Props>(
  ({ taskId, logicalDate, isMapped = false, mapIndex }, ref) => {
    if (!taskId) return null;
    const params = new URLSearchParamsWrapper({
      task_id: taskId,
      logical_date: logicalDate,
      map_index: mapIndex ?? -1,
    });
    const detailsLink = `${taskUrl}&${params}`;
    const listParams = new URLSearchParamsWrapper({
      _flt_3_dag_id: dagId,
      _flt_3_task_id: taskId,
      _oc_TaskInstanceModelView: "dag_run.logical_date",
    });

    if (mapIndex !== undefined && mapIndex >= 0)
      listParams.append("_flt_0_map_index", mapIndex.toString());

    const allInstancesLink = `${taskInstancesUrl}?${listParams.toString()}`;

    return (
      <Flex flexWrap="wrap" ref={ref} mb={2}>
        {(!isMapped || mapIndex !== undefined) && (
          <LinkButton href={detailsLink}>More Details</LinkButton>
        )}
        <LinkButton href={allInstancesLink} title="View all">
          List All Instances
        </LinkButton>
      </Flex>
    );
  }
);

export default Nav;
