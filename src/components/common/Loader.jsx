import React, { useState } from "react";
import { Flex, Spin } from 'antd';


const Loader = () => {
    return (
    <div className="loader">
     <Flex>
          <Spin size="large" className="custom-spinner"/>
    </Flex>
    </div>
    );
}

export default Loader;