<?php
/**
 * :tmtfactory) © 2019
 * Carles Capell <carles.capell@tmtfactory.com>
 */

namespace Tmtfactory\PrintingOmsBundle\Tests\Handler;


use PHPUnit\Framework\TestCase;

use Tmtfactory\PrintingOmsBundle\Command\ChangeOrderStatusCommand;
use Tmtfactory\PrintingOmsBundle\Domain\Order\IOrder;
use Tmtfactory\PrintingOmsBundle\Domain\OrderLine\IOrderLine;
use Tmtfactory\PrintingOmsBundle\Handler\ChangeOrderStatusHandler;
use Tmtfactory\PrintingOmsBundle\Repository\OrderLine\IOrderLineRepository;

class ChangeOrderStatusHandlerTest extends TestCase
{
    const ORDER_ID = "an_order_id";

    const NUM_OF_ORDER_LINES = 3;
    const ORDER_LINE_ID_0 = "an_order_line_id_0";
    const ORDER_LINE_ID_1 = "an_order_line_id_1";
    const ORDER_LINE_ID_2 = "an_order_line_id_2";

    const STATUS_0 = 0;
    const STATUS_1 = 1;

    public function testHandle()
    {
        $expectedValues = [
            [self::ORDER_LINE_ID_0, self::STATUS_1],
            [self::ORDER_LINE_ID_1, self::STATUS_1],
            [self::ORDER_LINE_ID_2, self::STATUS_1]
        ];

        $orderLineRepositoryMock =
            $this->getMockBuilder(IOrderLineRepository::class)
                ->setMethods(['updateOrderLineStatus'])
                ->getMockForAbstractClass();

        $orderLineRepositoryMock
            ->expects($this->exactly(self::NUM_OF_ORDER_LINES))
            ->method('updateOrderLineStatus')
            ->withConsecutive(...$expectedValues);

        $orderLinesMocks = array_map(
            function($expectedValues) {
                $orderLineMock = $this->getMockBuilder(IOrderLine::class)
                    ->setMethods(['getId'])
                    ->getMockForAbstractClass();

                $orderLineMock
                    ->expects($this->once())
                    ->method('getId')
                    ->willReturn($expectedValues[0]);

                return $orderLineMock;
            },
            $expectedValues
        );

        $orderMock =
            $this->getMockBuilder(IOrder::class)
            ->setMethods(['getOrderLines'])
            ->getMockForAbstractClass();

        $orderMock
            ->expects($this->once())
            ->method('getOrderLines')
            ->willReturn($orderLinesMocks);

        $command = new ChangeOrderStatusCommand($orderMock, self::STATUS_1);
        $handler = new ChangeOrderStatusHandler($orderLineRepositoryMock);

        $handler->handle($command);
    }

}