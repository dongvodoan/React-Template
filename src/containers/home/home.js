// @flow weak
import React, {
    PureComponent
}                       from 'react';
import PropTypes        from 'prop-types';
import {Link}           from 'react-router-dom';
import {
    AnimatedView,
    Stat as StatComponent,
    ToolTip,
    Button,
    Panel,
    Label,
    Badges,
    ProgressBar
}                         from '../../components';

// #region flow types
type
Props = any;
type
State = any;
// #endregion

class PageHome extends PureComponent<Props, State> {
    static propTypes = {
        actions: PropTypes.shape({
            enterHome: PropTypes.func.isRequired,
            leaveHome: PropTypes.func.isRequired
        })
    };

    componentDidMount() {
        const {
            actions: {
                enterHome
            }
        } =  this.props;
        enterHome();
    }

    componentWillUnmount() {
        const {
            actions: {
                leaveHome
            }
        } = this.props;
        leaveHome();
    }

    render() {
        return(
            <AnimatedView>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h2 className="not-found">
                            <i className="fa fa-thumbs-o-up fa-spin">
                            </i>
                            THIS IS HOME PAGE {process.env.REACT_APP_DOMAIN}!!!<br/>
                            <Link to="/protected">Protected</Link><br/>
                            <StatComponent
                                statFaIconName="fa-refresh"
                                statIconColor="#fa8564"
                                statIconSpin={true}
                                statLabel="Processing...."
                            />
                        </h2>
                        {/* <!--tooltips start--> */}
                        <Panel
                            title="Tooltips"
                            hasTitle={true}
                            bodyCustomClass="btn-gap"
                            bodyBackGndColor="gray">

                            <ToolTip
                                toolTipId={'tooltipTop'}
                                toolTipContent={<span>Tooltip on top</span>}
                                tooltipPlacement={'top'}>
                                <button
                                    title=""
                                    className="btn btn-default tooltips"
                                    type="button">
                                    Tooltip on top
                                </button>
                            </ToolTip>

                            <ToolTip
                                toolTipId={'tooltipLeft'}
                                toolTipContent={<span>Tooltip on left</span>}
                                tooltipPlacement={'left'}>
                                <button
                                    title=""
                                    className="btn btn-default tooltips"
                                    type="button">
                                    left
                                </button>
                            </ToolTip>

                            <ToolTip
                                toolTipId={'tooltipBottom'}
                                toolTipContent={<span>Tooltip on bottom</span>}
                                tooltipPlacement={'bottom'}>
                                <button
                                    title=""
                                    className="btn btn-default tooltips"
                                    type="button">
                                    bottom
                                </button>
                            </ToolTip>

                            <ToolTip
                                toolTipId={'tooltipRight'}
                                toolTipContent={<span>Tooltip on right</span>}
                                tooltipPlacement={'right'}>
                                <Button type="primary">
                                    Right
                                </Button>
                            </ToolTip>

                        </Panel>
                        {/* <!--tooltips end--> */}
                        <Label
                            type="primary"
                            text="Primary"
                        />
                        <Badges
                            type="primary"
                            number={7}
                        />
                        {/* <!--progress bar start--> */}
                        <Panel
                            title="Basic Progress Bars"
                            hasTitle={true}>
                            <p>
                                <code>
                                    .progress
                                </code>
                            </p>
                            <ProgressBar
                                barSize="progress"
                                barStriped={true}
                                barStyle="primary"
                                active={false}
                                valueNow={40}
                                valueMin={0}
                                valueMax={100}
                                screenReadersText={`${40}% Complete (success)`}
                            />
                            <p>
                                Class:
                                <code>
                                    .sm
                                </code>
                            </p>
                            <ProgressBar
                                barSize="sm"
                                barStriped={true}
                                barStyle="success"
                                active={true}
                                valueNow={20}
                                valueMin={0}
                                valueMax={100}
                                screenReadersText={`${20}% Complete`}
                            />
                            <p>
                                Class:
                                <code>
                                    .xs
                                </code>
                            </p>
                            <ProgressBar
                                barSize="xs"
                                barStriped={true}
                                barStyle="warning"
                                active={true}
                                valueNow={60}
                                valueMin={0}
                                valueMax={100}
                                screenReadersText={`${60}% Complete (warning)`}
                            />
                            <p>
                                Class:
                                <code>
                                    .xxs
                                </code>
                            </p>
                            <ProgressBar
                                barSize="xxs"
                                barStriped={true}
                                barStyle="danger"
                                active={false}
                                valueNow={60}
                                valueMin={0}
                                valueMax={100}
                                screenReadersText={`${60}% Complete (warning)`}
                            />
                        </Panel>
                        {/* <!--progress bar end--> */}
                    </div>
                </div>
            </AnimatedView>
        );
    }
}

export default PageHome;
