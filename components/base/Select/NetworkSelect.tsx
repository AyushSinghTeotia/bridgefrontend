import React, { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import style from './NetworkSelect.module.scss'
import SelectArrows from 'components/assets/SelectArrows';
import Check from 'components/assets/Check';
import Metamask from 'components/assets/Providers/Metamask'
import WalletConnect from 'components/assets/Providers/WalletConnect'
import Ethereum from 'components/assets/Networks/Ethereum';
import Binance from 'components/assets/Networks/Binance';

import { ChainType, ChainTypes } from 'interfaces';

import { useAppSelector } from 'redux/hooks';

export interface Option {
    value: ChainType;
    label: string;
    bridgeAddress: string;
    tokenAddress: string;
}

export const options: Option[] = [
    { value: ChainTypes.erc20, label: "Ethereum network (ERC20)", bridgeAddress: process.env.NEXT_PUBLIC_BRIDGE_ETH_ADDRESS || '0x100FC43A9D12Ee44CA028B531FD0EeaB632e31A9', tokenAddress: process.env.NEXT_PUBLIC_CAPS_TOKEN_ADDRESS_ETH || '0x70025695A7c4d50315b01Ed7309FcbD8353d3944' },
    { value: ChainTypes.bep20, label: "Binance Smart Chain (BEP20)", bridgeAddress: process.env.NEXT_PUBLIC_BRIDGE_BSC_ADDRESS || '0x36a544B6adc9Ffa5001Ff38d6DF8D2582Cc9f143', tokenAddress: process.env.NEXT_PUBLIC_CAPS_TOKEN_ADDRESS_BSC || '0xA1f2140F36A2Cf8dc34811416F26B28DA2819ef9' }
]

export interface NetworkSelectProps {
    selected: Option | null;
    handleChange: Function;
    isFrom: boolean;
}

const NetworkSelect: React.FC<NetworkSelectProps> = ({ selected, handleChange, isFrom }) => {
    const userWallet = useAppSelector((state) => state.user.userWallet)
    const [selectOpen, setSelectOpen] = useState(false)
    const notSelected = options.filter(x => x.value !== selected?.value)[0]
    const handleSelectChange = () => {
        handleChange(notSelected, isFrom)
        setSelectOpen(false)
    }
    return(
        <ClickAwayListener onClickAway={()=>selectOpen && setSelectOpen(false)}>
            <div className={style.selectContainer}> 
                <div className={style.networkRow + " " + (!selectOpen ? style.networkRowRadius : "") + " row d-flex align-items-center"}>
                    <div className={style.selectColumn + " col-10"}>
                        <div className={style.selectColumnRow + " row"}>
                            <div className={"col-10 col-md-8 px-2 d-flex align-items-center"}>
                                <div>
                                    {selected?.value === ChainTypes.erc20 ? 
                                        <Ethereum className={"mx-1"}/> 
                                    : 
                                        <Binance className={"mx-1"}/>}
                                </div>
                                <div className={style.networkLabel}>{selected?.label}</div>
                            </div>
                            <div className={"col-2 col-md-4 px-0 d-flex justify-content-center justify-content-md-left align-items-center"}>
                                {(userWallet && userWallet.chainType===selected?.value) && 
                                    <>
                                        {userWallet && userWallet.networkType==="metamask" ? <Metamask className={style.connectedIcon}/> : <WalletConnect className={style.connectedIcon}/>}
                                        <span className={style.connectedLabel}>{"Connected"}</span>
                                        <Check className={style.connectedCheck}/>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <div
                        className={style.selectArrows + " " + (!selectOpen ? style.selectArrowsRadius : "") + " col-2"}
                        onClick={() => setSelectOpen(!selectOpen)}
                    >
                        <SelectArrows />
                    </div>
                </div>
                <div className={selectOpen ? style.optionContainer : "d-none"} onClick={() => handleSelectChange()}>
                    <div className={"col-10 px-2"}>
                        <div className={style.selectColumnRow + " row"}>
                            <div className={"col-10 col-md-8 d-flex align-items-center"}>
                                <div>
                                    {notSelected.value === ChainTypes.erc20 ? 
                                        <Ethereum className={"mx-1"}/> 
                                    : 
                                        <Binance className={"mx-1"}/>}
                                </div>
                                <div>{notSelected.label}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>























































            
        </ClickAwayListener>
    )
}

export default NetworkSelect;