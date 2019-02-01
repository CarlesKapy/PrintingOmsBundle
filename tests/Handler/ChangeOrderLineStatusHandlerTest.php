<?php
/**
 * :tmtfactory) © 2019
 * Carles Capell <carles.capell@tmtfactory.com>
 */

namespace Tmtfactory\PrintingOmsBundle\Tests\Handler;


use PHPUnit\Framework\TestCase;

use Tmtfactory\PrintingOmsBundle\Command\ChangeOrderLineStatusCommand;
use Tmtfactory\PrintingOmsBundle\Domain\OrderLine\IOrderLine;
use Tmtfactory\PrintingOmsBundle\Handler\ChangeOrderLineStatusHandler;
use Tmtfactory\PrintingOmsBundle\Repository\OrderLine\IOrderLineRepository;

class ChangeOrderLineStatusHandlerTest extends TestCase
{
    const ORDER_LINE_ID_0 = "an_order_line_id_0";

    const STATUS_0 = 0;
    const STATUS_1 = 1;

    public function testHandle()
    {
        $orderLineRepositoryMock =
            $this->getMockBuilder(IOrderLineRepository::class)
                ->setMethods(['updateOrderLineStatus'])
                ->getMockForAbstractClass();

        $orderLineRepositoryMock
            ->expects($this->once())
            ->method('updateOrderLineStatus')
            ->with(
                self::ORDER_LINE_ID_0,
                self::STATUS_1
            );

        $orderLineMock = $this->getMockBuilder(IOrderLine::class)
            ->setMethods(['getId'])
            ->getMockForAbstractClass();

        $orderLineMock
            ->expects($this->once())
            ->method('getId')
            ->willReturn(self::ORDER_LINE_ID_0);


        $command = new ChangeOrderLineStatusCommand($orderLineMock, self::STATUS_1);
        $handler = new ChangeOrderLineStatusHandler($orderLineRepositoryMock);

        $handler->handle($command);
    }
}